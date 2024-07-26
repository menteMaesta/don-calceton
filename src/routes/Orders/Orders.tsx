import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import { es } from "helpers/strings";
import SliderImageCard from "components/SliderImageCard";
import { STATUS } from "helpers/constants";

export default function Orders() {
  useLoaderData();
  const statusStyle = {
    [STATUS.DELIVERED]: "text-green-500",
    [STATUS.IN_PROCESS]: "text-blue-500",
    [STATUS.CANCELED]: "text-red-500",
  };

  return (
    <Fragment>
      {/* //TODO: Add a search bar */}
      <div
        className="grid sm:grid-cols-3 grid-cols-1 gap-3 mt-4 mx-4"
        data-testid="orders_grid"
      >
        <SliderImageCard
          elementId={"1"}
          type="order"
          title={
            <p
              className="w-full font-semibold text-center dark:text-slate-100"
              title={STATUS.DELIVERED}
            >
              <i
                className={
                  "fa-solid fa-circle mr-2 " + statusStyle[STATUS.DELIVERED]
                }
              />
              Pedido 1
            </p>
          }
          footer={
            <Fragment>
              <p>{es.orders.position}</p>
              <p>Centro</p>
              <p>{es.orders.imageSize}</p>
              <p>16 cm</p>
              <p>{es.orders.status}</p>
              <p>En proceso</p>
            </Fragment>
          }
          images={[]}
        />
      </div>
    </Fragment>
  );
}
