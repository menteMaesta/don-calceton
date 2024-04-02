import { MouseEvent, useState } from "react";
import { useParams } from "react-router-dom";
import ElementCard from "components/ElementCard";
import { Variant } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import DefaultPic from "assets/default-pic.png";

type Props = {
  variant: Variant;
  onRemove: (event: MouseEvent<HTMLElement>, variantId: string) => void;
};
export default function VariantCard({ variant, onRemove }: Props) {
  const { productId = "" } = useParams();
  const [imageIndex, setImageIndex] = useState(0);

  const handleNextImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setImageIndex((currentIndex) =>
      currentIndex === variant.images.length - 1 ? 0 : currentIndex + 1
    );
  };

  const handlePrevImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setImageIndex((currentIndex) =>
      currentIndex === 0 ? variant.images.length - 1 : currentIndex - 1
    );
  };

  return (
    <ElementCard
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
    >
      {variant.images.length > 1 && (
        <button
          onClick={handlePrevImage}
          className="absolute left-2 text-slate-500"
          data-testid="variant-card_prev-image"
        >
          <i className="fa-solid fa-angle-left" />
        </button>
      )}
      <div className="w-full flex items-center justify-center">
        <img
          data-testid={`variant-image_${
            variant.images[imageIndex]?.id || "default"
          }`}
          className="max-h-64"
          src={
            variant.images[imageIndex]?.name
              ? `${import.meta.env.VITE_BASE_URL}/${
                  variant.images[imageIndex]?.name
                }`
              : DefaultPic
          }
        />
      </div>
      {variant.images.length > 1 && (
        <button
          onClick={handleNextImage}
          className="absolute right-2 text-slate-500"
          data-testid="variant-card_next-image"
        >
          <i className="fa-solid fa-angle-right" />
        </button>
      )}
    </ElementCard>
  );
}
