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
      data-testid={`product-data_${product.id}`}
    >
      <Link
        data-testid="product-data_edit"
        to={ROUTES.EDIT_PRODUCT.replace(":productId", `${product.id}`)}
        className={classnames(
          "absolute right-2 top-2",
          "fa-solid fa-pen",
          "text-gray-300",
          "hover:text-gray-500 active:text-gray-500"
        )}
      />

      <p className="text-2xl w-2/5 font-bold" data-testid="product-data_name">
        {product.name}
      </p>
      <div className="flex items-center space-x-2">
        <p
          data-testid="product-data_price"
          className={classnames(
            "bg-slate-600 text-white",
            "w-fit",
            "rounded-full px-2"
          )}
        >
          Precio base: ${product.price}
        </p>
        <p
          data-testid="product-data_wholesale-price"
          className={classnames(
            "bg-slate-600 text-white",
            "w-fit",
            "rounded-full px-2"
          )}
        >
          Mayoreo: ${product.wholesalePrice}
        </p>
      </div>
      <p
        data-testid="product-data_description"
        className={classnames(showHide, "w-full pt-2 overflow-hidden")}
      >
        {product.description}
      </p>
      <button
        data-testid="product-data_show-hide"
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
