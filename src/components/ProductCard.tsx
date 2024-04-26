import { MouseEvent } from "react";
import classnames from "classnames";
import ElementCard from "components/ElementCard";
import { Product } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import DefaultPic from "assets/default-pic.png";

type Props = {
  product: Product;
  onRemove: (event: MouseEvent<HTMLElement>, productId: string) => void;
};
export default function ProductCard({ product, onRemove }: Props) {
  const imageName = product.variants[0]?.images[0]?.name;
  return (
    <ElementCard
      elementId={`${product.id}`}
      title={product.name}
      type="product"
      onRemove={onRemove}
      route={ROUTES.PRODUCT.replace(":productId", `${product.id}`)}
      footer={
        <p
          data-testid={`product-description_${product.id}`}
          className="line-clamp-2 pt-2 px-2 mb-2"
          title={product.description}
        >
          {product.description}
        </p>
      }
    >
      <div
        className={classnames(
          "absolute bottom-0 right-0",
          "flex flex-col items-end"
        )}
      >
        <p
          className={classnames(
            "bg-slate-950 text-white",
            "w-fit sm:text-sm",
            "rounded-full px-2"
          )}
          data-testid={`product-price_${product.id}`}
        >
          <span>Base $</span>
          {product.price}
          <span> MXN</span>
        </p>
        <p
          className={classnames(
            "bg-slate-950 text-white",
            "w-fit mt-1 sm:text-sm",
            "rounded-full px-2"
          )}
          data-testid={`product-wholesale-price_${product.id}`}
        >
          <span>Mayoreo $</span>
          {product.wholesalePrice}
          <span> MXN</span>
        </p>
      </div>
      <img
        data-testid={`product-img_${product.id}`}
        className="max-h-64"
        src={
          imageName
            ? `${import.meta.env.VITE_BASE_URL}/${imageName}`
            : DefaultPic
        }
      />
    </ElementCard>
  );
}
