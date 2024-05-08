import { MouseEvent } from "react";
import Button from "components/Button";

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
        <Button onClick={onAddToCart} data-testid="add-to-cart">
          Agregar
        </Button>
      ) : (
        <Button onClick={onRemoveFromCart} data-testid="remove-from-cart">
          Quitar
        </Button>
      )}
    </div>
  );
}
