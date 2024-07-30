import { Fragment, useEffect } from "react";
import { useLoaderData, useActionData, useSubmit } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { es } from "helpers/strings";
import { STATUS } from "helpers/constants";
import { OrderType, ErrorType } from "helpers/customTypes";
import SliderImageCard from "components/SliderImageCard";
import OrderCardFooter from "routes/Orders/OrderCardFooter";
import EmptyState from "src/components/EmptyState";

export default function Orders() {
  const submit = useSubmit();
  const orders = useLoaderData() as OrderType[];
  const actionData = useActionData() as ErrorType;
  const [openSnackbar] = useSnackbar();
  const statusStyle = {
    [STATUS.DELIVERED]: "text-green-500",
    [STATUS.IN_PROCESS]: "text-blue-500",
    [STATUS.CANCELED]: "text-red-500",
  };

  const handleDownloadImages = (
    images: OrderType["images"],
    orderId: number
  ) => {
    const formData = new FormData();
    formData.append("order", "downloadOrderImages");
    formData.append("orderId", orderId.toString());
    images.forEach((image) => {
      formData.append("orderImageNames", image.name);
    });
    submit(formData, { method: "post" });
  };

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <Fragment>
      {/* //TODO: Add a search bar */}
      <div
        className="grid sm:grid-cols-3 grid-cols-1 gap-3 mt-4 mx-4"
        data-testid="orders_grid"
      >
        {orders.length > 0 &&
          orders.map((order) => (
            <SliderImageCard
              key={order.id}
              elementId={`${order.id}`}
              type="order"
              title={
                <p
                  className={
                    "w-full pb-2 " +
                    "font-semibold text-center " +
                    "dark:text-slate-100"
                  }
                  title={es.orders.status[order.status]}
                >
                  <i
                    className={
                      "fa-solid fa-circle mr-2 " + statusStyle[order.status]
                    }
                  />
                  #{order.id}
                  {order.variant.name}
                </p>
              }
              footer={
                <OrderCardFooter
                  order={order}
                  onDownloadImages={handleDownloadImages}
                />
              }
              images={order.variant.images}
            />
          ))}
        {orders.length === 0 && <EmptyState name={es.orders.name} />}
      </div>
    </Fragment>
  );
}
