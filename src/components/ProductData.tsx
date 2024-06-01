import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import { es } from "helpers/strings";

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
      className={
        "flex flex-wrap flex-col " +
        "justify-between " +
        "bg-white relative " +
        "px-4 py-2 " +
        "rounded-md shadow " +
        "dark:bg-slate-700 dark:text-white"
      }
      data-testid={`product-data_${product.id}`}
    >
      <Link
        data-testid="product-data_edit"
        to={ROUTES.EDIT_PRODUCT.replace(":productId", `${product.id}`)}
        className={
          "absolute right-2 top-2 " +
          "fa-solid fa-pen " +
          "text-slate-300 " +
          "hover:text-slate-500 active:text-slate-500 " +
          "dark:hover:text-slate-100"
        }
      />

      <p className="text-2xl w-2/5 font-bold" data-testid="product-data_name">
        {product.name}
      </p>
      <div className="flex items-center space-x-2">
        <p
          data-testid="product-data_price"
          className={
            "bg-slate-950 text-white " +
            "w-fit " +
            "rounded-full px-2 " +
            "dark:bg-slate-500"
          }
        >
          {`${es.products.basePrice}${es.priceSymbol}${product.price}`}
        </p>
        <p
          data-testid="product-data_wholesale-price"
          className={
            "bg-slate-950 text-white " +
            "w-fit " +
            "rounded-full px-2 " +
            "dark:bg-slate-500"
          }
        >
          {`${es.products.wholesalePrice}${product.wholesalePrice}`}
        </p>
      </div>
      <p
        data-testid="product-data_description"
        className={showHide + " w-full pt-2 overflow-hidden"}
      >
        {product.description}
      </p>
      <button
        data-testid="product-data_show-hide"
        className={
          "text-slate-400 text-start w-fit " +
          "hover:text-slate-500 " +
          "active:text-slate-500 " +
          "cursor-pointer leading-4 " +
          "dark:hover:text-slate-400 " +
          "dark:active:text-slate-400"
        }
        onClick={onShowHide}
      >
        {es.products.more}
      </button>
    </main>
  );
}
