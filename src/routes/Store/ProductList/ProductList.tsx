import { useLoaderData } from "react-router-dom";
import classnames from "classnames";
import SliderImageCard from "components/SliderImageCard";
import EmptyState from "components/EmptyState";
import { ProductListItem } from "helpers/customTypes";

export default function Products() {
  const products = useLoaderData() as ProductListItem[];

  return (
    <div className="mt-11 flex flex-col items-center w-full">
      <div
        className={classnames(
          "grid grid-cols-1 gap-4",
          "sm:grid-cols-2 md:grid-cols-3",
          "lg:grid-cols-5 w-full",
          "pt-7 px-4"
        )}
        data-testid="product-list"
      >
        {products &&
          (products || []).map((product) => (
            <SliderImageCard
              key={product.id}
              elementId={`${product.id}`}
              title={product.name}
              type="product"
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
            ></SliderImageCard>
          ))}
      </div>
      {products.length === 0 && <EmptyState name="productos" />}
    </div>
  );
}
