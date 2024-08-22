import { MouseEvent, useEffect, useMemo } from "react";
import { useLoaderData, useSubmit, useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import {
  CartItemType,
  ErrorType,
  PersonalizationType,
  PaypalItem,
} from "helpers/customTypes";
import {
  STATUS,
  PAYPAL_OPTIONS,
  WHOLESALE_THRESHOLD,
  PHYSICAL_GOODS,
} from "helpers/constants";
import { es } from "helpers/strings";
import {
  sendOrderImages,
  deleteOrderItems,
} from "routes/Store/VariantList/actions";
import {
  postOrder,
  createPaypalOrder,
  verifyOrderStock,
  capturePaypalOrder,
} from "routes/Store/Cart/api";
import CartItem from "storeComponents/CartItem";
import EmptyState from "components/EmptyState";
import BottomBar from "src/components/BottomBar";

export default function Cart() {
  const actionData = useActionData() as ErrorType;
  const { cart, totalPrice } = useLoaderData() as {
    cart: CartItemType[];
    totalPrice: number;
  };
  const submit = useSubmit();
  const [openSnackbar] = useSnackbar();

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  const canSendOrders = useMemo(() => {
    const hasEmptyValues = cart.findIndex((item) => {
      const personalizations = item.personalizations || [];
      return personalizations.find(
        (personalization: PersonalizationType) =>
          personalization.quantity === 0 ||
          personalization.customizationId === 0 ||
          personalization.images?.length === 0 ||
          personalization.imageSize === 0
      );
    });
    if (hasEmptyValues !== -1) {
      return false;
    } else {
      return true;
    }
  }, [cart]);

  const onRemoveFromCart = (
    event: MouseEvent<HTMLElement>,
    variantId: string
  ) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", `${variantId}`);
    formData.append("store", "removeVariant");
    submit(formData, { method: "post" });
  };

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    const orderItems: PaypalItem[] = [];
    const itemsConfirmStock = [];

    for (const item of cart) {
      const personalizations = item.personalizations || [];
      for (const personalization of personalizations) {
        orderItems.push({
          name: item.name || "",
          quantity: `${personalization.quantity}`,
          category: PHYSICAL_GOODS,
          unit_amount: {
            currency_code: PAYPAL_OPTIONS.currency,
            value:
              personalization.quantity >= WHOLESALE_THRESHOLD
                ? `${item.productWholesalePrice}`
                : `${item.productPrice}`,
          },
        });
      }

      itemsConfirmStock.push({
        variantId: item.id,
        quantity:
          personalizations.reduce(
            (total: number, element: PersonalizationType) => {
              total += element.quantity || 0;
              return total;
            },
            0
          ) || 0,
      });
    }

    try {
      // Verify stock
      const verifyOrderStatus = await verifyOrderStock({
        orders: itemsConfirmStock,
      });
      if (verifyOrderStatus !== 200) {
        throw es.errors.stock;
      } else {
        // create order in paypal
        const { data: orderData } = await createPaypalOrder(
          totalPrice,
          orderItems
        );
        if (orderData.id) {
          return orderData.id;
        } else {
          const errorDetail = orderData?.details?.[0];
          const errorMessage = errorDetail
            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
            : JSON.stringify(orderData);
          throw errorMessage;
        }
      }
    } catch (error) {
      openSnackbar(error);
      return "";
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (
    data,
    actions
  ) => {
    try {
      const { data: orderData } = await capturePaypalOrder(data.orderID);
      const errorDetail = orderData?.details?.[0];
      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw `${errorDetail.description} (${orderData.debug_id})`;
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        openSnackbar(
          es.orders.transaction
            .replace("{status}", transaction.status)
            .replace("{transactionId}", transaction.id)
        );
        console.log(
          "Capture result:",
          orderData,
          JSON.stringify(orderData, null, 2)
        );

        // send orders to server
        for (const item of cart) {
          const personalizations = item.personalizations || [];
          for (const personalization of personalizations) {
            const { data, status } = await postOrder({
              variantId: item.id,
              quantity: personalization.quantity,
              customizationId: personalization.customizationId,
              imageSize: personalization.imageSize,
              status: STATUS.IN_PROCESS,
            });
            if (status !== 200) {
              const error: ErrorType = data.errors ? data.errors[0] : data;
              throw error.message;
            } else {
              const error: ErrorType = await sendOrderImages(
                personalization,
                data.id
              );
              if (error) {
                throw error.message;
              }
            }
          }
        }

        // delete cart
        await deleteOrderItems();
      }
    } catch (error) {
      openSnackbar(error);
    }
  };

  return (
    <div
      className="mt-11 flex flex-col w-full px-4 pb-10"
      data-testid="cart_page"
    >
      <p
        className="font-bold dark:text-slate-200 mt-4"
        data-testid="total-product_price"
      >
        <i
          className={
            "fa-solid fa-cart-shopping " +
            "text-xl " +
            "mr-2 dark:text-slate-300"
          }
        />
        {es.orders.totalPrice}
        {totalPrice}
      </p>
      {cart.length > 0 ? (
        <div
          data-testid="cart_list"
          className={
            "mt-4 " +
            "grid grid-cols-1 gap-4 " +
            "sm:grid-cols-1 md:grid-cols-2 " +
            "lg:grid-cols-3 w-full"
          }
        >
          {cart.map((item) => (
            <CartItem key={item.id} item={item} onRemove={onRemoveFromCart} />
          ))}
        </div>
      ) : (
        <EmptyState name="productos" />
      )}

      <BottomBar className="!h-20 !justify-center">
        <div className="w-full sm:w-2/4">
          <PayPalButtons
            style={{
              shape: "rect",
              layout: "horizontal",
              color: "black",
              label: "pay",
              height: 33,
              disableMaxWidth: true,
            }}
            disabled={!canSendOrders}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={(error) => openSnackbar(error.message)}
          />
        </div>
      </BottomBar>
    </div>
  );
}
