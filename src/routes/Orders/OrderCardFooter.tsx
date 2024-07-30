import { Fragment } from "react";
import { es } from "helpers/strings";
import { OrderType } from "helpers/customTypes";
import { ORDER_SELECTORS } from "helpers/test";
import Button from "components/Button";

type Props = {
  order: OrderType;
  onDownloadImages: (images: OrderType["images"], orderId: number) => void;
};
export default function OrderCardFooter({ order, onDownloadImages }: Props) {
  return (
    <Fragment>
      <p
        className="font-bold dark:text-slate-200 pt-4"
        data-testid={ORDER_SELECTORS.position}
      >
        {es.orders.position}
      </p>
      <p>{order.customization.title}</p>
      <p
        className="font-bold dark:text-slate-200"
        data-testid={ORDER_SELECTORS.imageSize}
      >
        {es.orders.imageSize}
      </p>
      <p>{order.imageSize} cm</p>
      <p
        className="font-bold dark:text-slate-200"
        data-testid={ORDER_SELECTORS.status}
      >
        {es.orders.statusLabel}
      </p>
      <p>{es.orders.status[order.status]}</p>
      <Button
        className={
          "mt-2 bg-slate-800 " + "dark:bg-slate-800 dark:hover:bg-slate-900"
        }
        onClick={() => onDownloadImages(order.images, order.id)}
        data-testid={ORDER_SELECTORS.download}
      >
        <i className="fa-solid fa-file-arrow-down pr-2" />
        {es.orders.downloadImages}
      </Button>
    </Fragment>
  );
}
