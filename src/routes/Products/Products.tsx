import { useLoaderData, Link } from "react-router-dom";
import classnames from "classnames";
import SearchBar from "components/SearchBar";
import ProductCard from "components/ProductCard";
import { Product } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";

export default function Products() {
  const products = useLoaderData() as Product[];

  return (
    <div className="mt-11 flex flex-col items-center">
      <SearchBar />
      <Link
        to={`${ROUTES.NEW_PRODUCT}`}
        className={classnames(
          "w-36 rounded mt-4",
          "py-2 z-10 text-center",
          "bg-slate-700 text-white",
          "mr-2 sticky top-12",
          "hover:bg-slate-800"
        )}
      >
        Nuevo producto
      </Link>
      <div
        className={classnames(
          "grid grid-cols-1 gap-4",
          "sm:grid-cols-3 w-full",
          "pt-7 px-4"
        )}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
