import { useEffect, useState, MouseEvent } from "react";
import classnames from "classnames";
import { useLoaderData, useSubmit, useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { Product, ProductBase } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import VariantCard from "components/VariantCard";
import SectionDivider from "components/SectionDivider";
import SearchBar from "components/SearchBar";
import SticyLink from "components/StickyLink";
import ProductData from "components/ProductData";

export default function ProductDetails() {
  const product = useLoaderData() as Product;
  const actionData = useActionData() as any;
  const submit = useSubmit();
  const [openSnackbar] = useSnackbar();
  const [variants, setVariants] = useState(product?.variants);

  const onSearch = (search: string) => {
    if (search) {
      const filtered = variants.filter((variant) =>
        variant.name.toLocaleLowerCase().includes(search)
      );
      setVariants(filtered);
    } else {
      setVariants(product?.variants);
    }
  };

  const handleRemove = (event: MouseEvent<HTMLElement>, variantId: string) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("products", "deleteVariant");
    formData.append("variantId", variantId);
    formData.append("productId", `${product.id}`);
    submit(formData, { method: "post" });
  };

  const onEdit = (data: ProductBase) => {
    const formData = new FormData();
    formData.append("products", "editProduct");
    formData.append("productId", `${product.id}`);
    formData.append("name", data.name);
    formData.append("price", `${data.price}`);
    formData.append("description", data.description);
    submit(formData, { method: "post" });
  };

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
  }, [actionData]);

  useEffect(() => {
    if (actionData?.statusText === "200") {
      setVariants((prev) =>
        prev.filter((variant) => `${variant.id}` !== actionData.id || "")
      );
    }
  }, [actionData]);

  return (
    <div className={classnames("w-full mt-14 px-4")}>
      <ProductData product={product} onEditData={onEdit} />

      <section className="relative flex flex-col items-center w-full">
        <SectionDivider section="Variantes" />
        <SearchBar onSearch={onSearch} placeholder="Buscar variantes" />
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
          {variants &&
            variants.map((variant) => (
              <VariantCard
                key={variant.id}
                variant={variant}
                onRemove={handleRemove}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
