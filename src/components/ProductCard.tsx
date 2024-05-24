import { MouseEvent } from "react";
import { ProductListItem } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import Prices from "components/Prices";
import SliderImageCard from "./SliderImageCard";

type Props = {
  product: ProductListItem;
  onRemove?: (event: MouseEvent<HTMLElement>, productId: string) => void;
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
      <Prices
        id={product.id}
        price={product.price}
        wholesalePrice={product.wholesalePrice}
        className="items-end absolute bottom-0 right-0"
      />
    </SliderImageCard>
  );
}
