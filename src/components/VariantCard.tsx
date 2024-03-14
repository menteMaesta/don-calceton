import { MouseEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";
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
    <Link
      to={`${ROUTES.PRODUCT.replace(
        ":productId",
        productId
      )}${ROUTES.VARIANT.replace(":variantId", `${variant.id}`)}`}
      className={classnames(
        "flex flex-wrap",
        "rounded py-2 px-4",
        "bg-white shadow relative",
        "items-center justify-center"
      )}
    >
      <i
        role="button"
        onClick={(event) => onRemove(event, `${variant.id}`)}
        className={classnames(
          "absolute right-2 top-2",
          "fa-solid fa-circle-xmark",
          "text-gray-300",
          "hover:text-gray-500 active:text-gray-500"
        )}
      />
      {variant.images.length > 1 && (
        <button
          onClick={handlePrevImage}
          className="absolute left-2 text-slate-500"
        >
          <i className="fa-solid fa-angle-left" />
        </button>
      )}
      <div className="w-full flex items-center justify-center">
        <img
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
        >
          <i className="fa-solid fa-angle-right" />
        </button>
      )}
      <p className="w-3/5 text-lg font-semibold">{variant.name}</p>
      <p className="w-2/5 pt-2 px-2 mb-2 text-right">
        <span className="text-sm">stock: </span>
        {variant.quantity}
      </p>
    </Link>
  );
}
