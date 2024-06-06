import { MouseEvent } from "react";
import AddProductButton from "storeComponents/AddProductButton";
import Prices from "components/Prices";
import SliderImageCard from "components/SliderImageCard";
import { VariantListItem, SliderImage } from "helpers/customTypes";

type props = {
  variant: VariantListItem;
  onAddToCart: (variant: VariantListItem) => void;
  onRemoveFromCart: (variantId: number) => void;
  inCart?: boolean;
};

export default function VariantItem({
  variant,
  onAddToCart,
  onRemoveFromCart,
  inCart = false,
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
    <SliderImageCard
      elementId={`store-${variant.id}`}
      title={variant.name}
      type="variant"
      footer={
        <AddProductButton
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemove}
          inCart={inCart}
        />
      }
      images={(variant.images || []) as SliderImage[]}
    >
      <Prices
        id={variant.id}
        price={variant.productPrice}
        wholesalePrice={variant.productWholesalePrice}
        className="items-end absolute bottom-0 right-0"
      />
    </SliderImageCard>
  );
}
