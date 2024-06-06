import { MouseEvent } from "react";
import Button from "components/Button";
import { es } from "helpers/strings";

type props = {
  onAddToCart: (event: MouseEvent<HTMLButtonElement>) => void;
  onRemoveFromCart: (event: MouseEvent<HTMLButtonElement>) => void;
  inCart?: boolean;
};

export default function AddProductButton({
  onAddToCart,
  onRemoveFromCart,
  inCart,
}: props) {
  return (
    <div
      className={"flex w-full " + "items-center " + "justify-center pt-2"}
      data-testid="add-products_button"
    >
      {!inCart ? (
        <Button
          onClick={onAddToCart}
          data-testid="add-to-cart"
          className={
            "bg-slate-800 hover:bg-slate-700 " +
            "active:bg-slate-700 " +
            "dark:!bg-slate-500 " +
            "dark:hover:!bg-slate-600 " +
            "dark:active:!bg-slate-600"
          }
        >
          {es.add}
        </Button>
      ) : (
        <Button
          onClick={onRemoveFromCart}
          data-testid="remove-from-cart"
          className={
            "bg-slate-800 hover:bg-slate-700 " +
            "active:bg-slate-700 " +
            "dark:!bg-slate-500 " +
            "dark:hover:!bg-slate-600 " +
            "dark:active:!bg-slate-600"
          }
        >
          Quitar
        </Button>
      )}
    </div>
  );
}
