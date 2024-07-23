import { MouseEvent, useEffect } from "react";
import { useLoaderData, useSubmit, useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { CartItemType, ErrorType } from "helpers/customTypes";
import CartItem from "storeComponents/CartItem";
import EmptyState from "components/EmptyState";
import BuyBottomBar from "src/components/BuyBottomBar";

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

  const onSubmitOrder = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("store", "submitOrder");
    submit(formData, { method: "post" });
  };

  return (
    <div
      className="mt-11 flex flex-col w-full px-4 pb-10"
      data-testid="cart_page"
    >
      {cart.length > 0 ? (
        <div
          data-testid="cart_list"
          className={
            "mt-8 " +
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
      <BuyBottomBar totalPrice={totalPrice} onSubmitOrder={onSubmitOrder} />
    </div>
  );
}
