import { MouseEvent } from "react";
import ElementCard from "components/ElementCard";
import Button from "components/Button";
import Prices from "components/Prices";
import { VariantListItem } from "helpers/customTypes";
import DefaultPic from "assets/default-pic.png";

type props = {
  variant: VariantListItem;
  onAddToCart: (variant: VariantListItem) => void;
};

export default function VariantItem({ variant, onAddToCart }: props) {
  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onAddToCart(variant);
  };
  return (
    <ElementCard
      elementId="variant-item"
      title={variant.name}
      type="variant"
      footer={
        <div className="flex w-full items-center justify-center pt-2">
          <Button onClick={handleAddToCart}>Añadir al carrito</Button>
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
