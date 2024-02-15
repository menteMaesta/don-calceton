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
        <p className="w-full pt-2">{product.description}</p>
      </main>

      <section className="relative flex flex-col items-center w-full">
        <SectionDivider section="Variantes" />
        <SearchBar onSearch={() => {}} placeholder="Buscar variantes" />
        <SticyLink to={ROUTES.NEW_PRODUCT} title="Nueva variante" />
        <div
          className={classnames(
            "grid grid-cols-1 gap-4",
            "sm:grid-cols-3 w-full",
            "pt-7 px-4"
          )}
        >
          {product.variants.map((variant) => (
            <VariantCard variant={variant} />
          ))}
        </div>
      </section>
    </div>
  );
}
