import { MouseEvent } from "react";
import Button from "components/Button";

type props = {
  onAddToCart: (event: MouseEvent<HTMLButtonElement>) => void;
  onRemoveFromCart: (event: MouseEvent<HTMLButtonElement>) => void;
  inCart?: number;
};

export default function AddProductButton({
  onAddToCart,
  onRemoveFromCart,
  inCart = 0,
}: props) {
  return (
    <div
      className={"flex w-full " + "items-center " + "justify-center pt-2"}
      data-testid="add-products_button"
    >
      {inCart > 0 ? (
        <div
          className={
            "bg-slate-800 " +
            "text-white " +
            "font-medium " +
            "rounded py-1 px-4"
          }
        >
          <i
            className={"fa-solid fa-minus " + "cursor-pointer"}
            onClick={onRemoveFromCart}
            data-testid="remove-from-cart"
          />
          <span className="mx-6">{inCart}</span>
          <i
            className={"fa-solid fa-plus " + "cursor-pointer"}
            onClick={onAddToCart}
            data-testid="add-item-to-cart"
          />
        </div>
      ) : (
        <Button onClick={onAddToCart} data-testid="add-to-cart">
          Agregar
        </Button>
      )}
    </div>
  );
}
