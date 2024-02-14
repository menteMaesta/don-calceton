import classnames from "classnames";
import { useLoaderData } from "react-router-dom";
import { Product } from "helpers/customTypes";

export default function ProductDetails() {
  const product = useLoaderData() as Product;

  return (
    <div className={classnames("w-full mt-14 px-4")}>
      <div className="flex flex-wrap items-center justify-between">
        <p className="text-2xl w-2/5 font-bold">{product.name}</p>
        <p
          className={classnames(
            "bg-black text-white",
            "w-fit",
            "rounded-full px-2"
          )}
        >
          Precio base: ${product.price}
        </p>
        <p className="w-full pt-2">{product.description}</p>
      </div>
      <div className="relative h-64 flex items-center justify-center"></div>
    </div>
  );
}
