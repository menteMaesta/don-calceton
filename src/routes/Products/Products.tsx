import { useLoaderData } from "react-router-dom";
import classnames from "classnames";
import SearchBar from "components/SearchBar";
import ProductCard from "components/ProductCard";
import { Product } from "helpers/customTypes";
import { Fragment } from "react";

export default function Products() {
  const products = useLoaderData() as Product[];
  return (
    <Fragment>
      <SearchBar />
      <div
        className={classnames(
          "grid grid-cols-1 gap-4",
          "sm:grid-cols-3 w-full",
          "pt-9 px-4"
        )}
      >
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </Fragment>
  );
}
