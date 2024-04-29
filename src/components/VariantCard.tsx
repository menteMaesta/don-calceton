import { MouseEvent } from "react";
import { useParams } from "react-router-dom";
import SliderImageCard from "components/SliderImageCard";
import { Variant } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";

type Props = {
  variant: Variant;
  onRemove: (event: MouseEvent<HTMLElement>, variantId: string) => void;
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
      footer={
        <div className="flex px-2">
          <p
            className="w-3/5 text-lg font-semibold"
            data-testid={`variant-card-name_${variant.id}`}
          >
            {variant.name}
          </p>
          <p
            className="w-2/5 pt-2 px-2 mb-2 text-right"
            data-testid={`variant-quantity_${variant.id}`}
          >
            <span className="text-sm">stock: </span>
            {variant.quantity}
          </p>
        </div>
      }
      images={variant.images}
    />
  );
}
