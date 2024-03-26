import { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Product } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";

type Props = {
  product: Product;
};

export default function ProductData({ product }: Props) {
  const [showHide, setShowHide] = useState<string>("line-clamp-2");

  const onShowHide = () => {
    setShowHide((prev) => (prev ? "" : "line-clamp-2"));
  };

  return (
    <main
      className={classnames(
        "flex flex-wrap flex-col",
        "justify-between",
        "bg-white relative",
        "px-4 py-2",
        "rounded-md shadow"
      )}
    >
      <Link
        to={ROUTES.EDIT_PRODUCT.replace(":productId", `${product.id}`)}
        className={classnames(
          "absolute right-2 top-2",
          "fa-solid fa-pen",
          "text-gray-300",
          "hover:text-gray-500 active:text-gray-500"
        )}
      />

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
      <p className={classnames(showHide, "w-full pt-2 overflow-hidden")}>
        {product.description}
      </p>
      <button
        className={classnames(
          "text-gray-300 text-start",
          "hover:text-gray-500",
          "active:text-gray-500",
          "cursor-pointer leading-4"
        )}
        onClick={onShowHide}
      >
        mas...
      </button>
    </main>
  );
}