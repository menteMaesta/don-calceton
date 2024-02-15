import { useState } from "react";
import classnames from "classnames";
import { useLoaderData } from "react-router-dom";
import { Product } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import VariantCard from "components/VariantCard";
import SectionDivider from "components/SectionDivider";
import SearchBar from "components/SearchBar";
import SticyLink from "components/StickyLink";

export default function ProductDetails() {
  const product = useLoaderData() as Product;
  const [showHide, setShowHide] = useState<string>("line-clamp-4");
  const onShowHide = () => {
    setShowHide((prev) => (prev ? "" : "line-clamp-4"));
  };
  return (
    <div className={classnames("w-full mt-14 px-4")}>
      <main className="flex flex-wrap items-center justify-between bg-white px-4 py-2 rounded-md shadow">
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
            "text-gray-300",
            "hover:text-gray-500",
            "active:text-gray-500",
            "cursor-pointer leading-4"
          )}
          onClick={onShowHide}
        >
          mas...
        </button>
      </main>

      <section className="relative flex flex-col items-center w-full">
        <SectionDivider section="Variantes" />
        <SearchBar onSearch={() => {}} placeholder="Buscar variantes" />
        <SticyLink
          to={ROUTES.NEW_VARIANT.replace(":productId", `${product.id}`)}
          title="Nueva variante"
        />
        <div
          className={classnames(
            "grid grid-cols-1 gap-4",
            "sm:grid-cols-3 w-full",
            "pt-7 px-4"
          )}
        >
          {product.variants.map((variant) => (
            <VariantCard key={variant.id} variant={variant} />
          ))}
        </div>
      </section>
    </div>
  );
}
