import classnames from "classnames";
import { Product } from "helpers/customTypes";

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  return (
    <div
      className={classnames("flex flex-col", "rounded p-2", "bg-white shadow")}
    >
      <p className="w-full font-semibold text-center">{product.name}</p>
      <div className="relative h-64 flex items-center">
        <p
          className={classnames(
            "bg-black text-white",
            "w-fit absolute bottom-0 right-0",
            "rounded-full px-2"
          )}
        >
          <span>Base $</span>
          {product.price}
          <span> MXN</span>
        </p>
        <img
          className="max-h-64"
          src={`${import.meta.env.VITE_BASE_URL}/${
            product.variants[0].images[0].name
          }`}
        />
      </div>
      <p className="line-clamp-2 pt-2" title={product.description}>
        {product.description}
      </p>
    </div>
  );
}
