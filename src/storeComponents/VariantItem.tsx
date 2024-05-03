import { MouseEvent } from "react";
import ElementCard from "components/ElementCard";
import Button from "components/Button";
import Prices from "components/Prices";
import { VariantListItem } from "helpers/customTypes";
import DefaultPic from "assets/default-pic.png";

type props = {
  variant: VariantListItem;
  onAddToCart: (variant: VariantListItem) => void;
  onRemoveFromCart: (variantId: number) => void;
  inCart?: number;
};

export default function VariantItem({
  variant,
  onAddToCart,
  onRemoveFromCart,
  inCart = 0,
}: props) {
  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onAddToCart(variant);
  };
  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onRemoveFromCart(variant.id);
  };
  return (
    <ElementCard
      elementId="variant-item"
      title={variant.name}
      type="variant"
      footer={
        <div className="flex w-full items-center justify-center pt-2">
          {inCart > 0 ? (
            <div
              className={
                "bg-slate-800 text-white " +
                "font-medium " +
                "rounded py-1 px-4"
              }
            >
              <i
                className={"fa-solid fa-minus " + "cursor-pointer"}
                onClick={handleRemove}
              />
              <span className="mx-6">{inCart}</span>
              <i
                className={"fa-solid fa-plus " + "cursor-pointer"}
                onClick={handleAddToCart}
              />
            </div>
          ) : (
            <Button onClick={handleAddToCart}>Agregar</Button>
          )}
        </div>
      }
    >
      <div className="w-full flex items-center justify-center">
        <Prices
          id={variant.id}
          price={variant.productPrice}
          wholesalePrice={variant.productWholesalePrice}
        />
        <img
          data-testid={`store-item_${variant.images?.id || "default"}`}
          className="max-h-64"
          alt={
            variant.images?.id
              ? `variant image ${variant.images?.id}`
              : "default image"
          }
          src={
            variant.images?.name
              ? `${import.meta.env.VITE_BASE_URL}/${variant.images?.name}`
              : DefaultPic
          }
        />
      </div>
    </ElementCard>
  );
}
