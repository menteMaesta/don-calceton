import { Link } from "react-router-dom";
import classnames from "classnames";
import { Product } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import DefaultPic from "assets/default-pic.png";

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  const imageName = product.variants[0]?.images[0]?.name;
  return (
    <Link
      to={ROUTES.PRODUCT.replace(":productId", `${product.id}`)}
      className={classnames("flex flex-col", "rounded p-2", "bg-white shadow")}
    >
      <p className="w-full font-semibold text-center">{product.name}</p>
      <div className="relative h-64 flex items-center justify-center">
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
          src={
            imageName
              ? `${import.meta.env.VITE_BASE_URL}/${imageName}`
              : DefaultPic
          }
        />
      </div>
      <p className="line-clamp-2 pt-2 px-2 mb-2" title={product.description}>
        {product.description}
      </p>
    </Link>
  );
}
