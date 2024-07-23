import { MouseEvent } from "react";
import Button from "components/Button";
import { es } from "helpers/strings";

export default function BuyBottomBar({
  totalPrice,
  onSubmitOrder,
}: {
  totalPrice: number;
  onSubmitOrder: (event: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <div
      className={
        "bg-white border-t" +
        " h-10 shadow-2xl" +
        " w-screen absolute" +
        " bottom-0 left-0" +
        " flex justify-between items-center" +
        " px-4 z-[1]" +
        " dark:bg-slate-900 dark:border-slate-950"
      }
      data-testid="bottom-bar-container"
    >
      <p
        className=" font-bold dark:text-slate-200"
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
      <Button onClick={onSubmitOrder}>{es.orders.buy}</Button>
    </div>
  );
}
