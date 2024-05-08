import { useState } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import Select from "react-select";
import classnames from "classnames";
import EmptyState from "components/EmptyState";
import VariantItem from "storeComponents/VariantItem";
import { VariantListItem, Option } from "helpers/customTypes";

export default function VariantList() {
  const submit = useSubmit();
  const { variants, productOptions, cart } = useLoaderData() as {
    variants: VariantListItem[];
    productOptions: Option[];
    cart: VariantListItem[];
  };
  const [filteredVariants, setFilteredVariants] =
    useState<VariantListItem[]>(variants);

  const onFilter = (option: readonly Option[]) => {
    if (option.length <= 0) {
      setFilteredVariants(variants);
      return;
    }
    const filtered = variants.filter((variant) =>
      option.find((item) => item.value === variant.productId)
    );
    setFilteredVariants(filtered);
  };

  const onAddToCart = (variant: VariantListItem) => {
    const formData = new FormData();
    formData.append("id", `${variant.id}`);
    formData.append("store", "addVariant");
    submit(formData, { method: "post" });
  };

  const onRemoveFromCart = (variantId: number) => {
    const formData = new FormData();
    formData.append("id", `${variantId}`);
    formData.append("store", "removeVariant");
    submit(formData, { method: "post" });
  };

  return (
    <div className="mt-11 flex flex-col items-center w-full">
      <Select
        isMulti
        isSearchable={false}
        onChange={onFilter}
        options={productOptions}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            marginTop: "1rem",
            minWidth: "20rem",
          }),
        }}
        placeholder="Filtrar por producto"
      />
      {filteredVariants && filteredVariants.length > 0 ? (
        <div
          className={classnames(
            "grid grid-cols-1 gap-4",
            "sm:grid-cols-2 md:grid-cols-3",
            "lg:grid-cols-5 w-full",
            "pt-7 px-4"
          )}
          data-testid="variant-item_list"
        >
          {filteredVariants &&
            filteredVariants.map((variant) => (
              <VariantItem
                key={variant.id}
                variant={variant}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                inCart={cart.some((item) => item.id === variant.id)}
              />
            ))}
        </div>
      ) : (
        <EmptyState name="variantes" />
      )}
    </div>
  );
}
