import { useEffect, useState, MouseEvent } from "react";
import { useLoaderData, useSubmit, useActionData } from "react-router-dom";
import classnames from "classnames";
import { useSnackbar } from "react-simple-snackbar";
import SearchBar from "components/SearchBar";
import ProductCard from "components/ProductCard";
import SticyLink from "components/StickyLink";
import EmptyState from "components/EmptyState";
import { Product } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";

export default function Products() {
  const data = useLoaderData() as Product[];
  const submit = useSubmit();
  const actionData = useActionData() as any;
  const [openSnackbar] = useSnackbar();
  const [products, setProducts] = useState<Product[]>(data);

  const onSearch = (search: string) => {
    if (search) {
      const filtered = data.filter((product) =>
        product.name.toLocaleLowerCase().includes(search)
      );
      setProducts(filtered);
    } else {
      setProducts(data);
    }
  };

  const handleRemove = (event: MouseEvent<HTMLElement>, productId: string) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("products", "deleteProduct");
    formData.append("productId", productId);
    submit(formData, { method: "post" });
  };

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
  }, [actionData]);

  useEffect(() => {
    if (actionData?.statusText === "200") {
      setProducts((prev) =>
        prev.filter((product) => `${product.id}` !== actionData.id || "")
      );
    }
  }, [actionData]);

  return (
    <div className="mt-11 flex flex-col items-center w-full h-full">
      <SearchBar onSearch={onSearch} placeholder="Buscar productos" />
      <SticyLink to={ROUTES.NEW_PRODUCT} title="Nuevo producto" />
      <div
        className={classnames(
          "grid grid-cols-1 gap-4",
          "sm:grid-cols-3 w-full",
          "pt-7 px-4"
        )}
      >
        {products &&
          (products || []).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRemove={handleRemove}
            />
          ))}
      </div>
      {products.length === 0 && <EmptyState name="productos" />}
    </div>
  );
}
