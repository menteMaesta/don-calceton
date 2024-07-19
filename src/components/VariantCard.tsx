import { MouseEvent } from "react";
import { useParams } from "react-router-dom";
import SliderImageCard from "components/SliderImageCard";
import { Variant } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";

type Props = {
  variant: Variant;
  onRemove?: (event: MouseEvent<HTMLElement>, variantId: string) => void;
};
export default function VariantCard({ variant, onRemove }: Props) {
  const { productId = "" } = useParams();

  return (
    <SliderImageCard
      elementId={`${variant.id}`}
      type="variant"
      onRemove={onRemove}
      route={`${ROUTES.PRODUCT.replace(
        ":productId",
        productId
      )}${ROUTES.VARIANT.replace(":variantId", `${variant.id}`)}`}
      title={variant.name}
      footer={
        <p data-testid={`variant-quantity_${variant.id}`}>
          <span>stock: </span>
          {variant.quantity}
        </p>
      }
      images={variant.images}
    />
  );
}
