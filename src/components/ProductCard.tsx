import { MouseEvent } from "react";
import classnames from "classnames";
import { ProductListItem } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import SliderImageCard from "./SliderImageCard";

type Props = {
  product: ProductListItem;
  onRemove: (event: MouseEvent<HTMLElement>, productId: string) => void;
};
export default function ProductCard({ product, onRemove }: Props) {
  return (
    <SliderImageCard
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
      images={product.variants}
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
    </SliderImageCard>
  );
}
