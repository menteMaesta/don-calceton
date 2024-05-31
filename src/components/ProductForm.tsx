import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ProductBase } from "helpers/customTypes";
import { es } from "helpers/strings";
import Button from "components/Button";
import Input from "components/Input";

type Props = {
  data?: ProductBase;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  cancelLink: string;
};

export default function ProductForm({
  data,
  onChange,
  onSubmit,
  cancelLink,
}: Props) {
  return (
    <form
      className="flex flex-col mt-14 space-y-6 items-center"
      onSubmit={onSubmit}
      data-testid="product-form"
    >
      <Input
        label={es.name}
        data-testid="name_input"
        name="name"
        placeholder={es.products.namePlaceholder}
        value={data?.name || ""}
        onChange={onChange}
        labelClassName="w-full sm:w-3/6"
      />

      <Input
        label={es.products.basePrice}
        type="number"
        name="price"
        step="0.01"
        placeholder={es.products.pricePlaceholder}
        value={data?.price || ""}
        onChange={onChange}
        labelClassName="w-full sm:w-3/6"
      />

      <Input
        label={es.products.wholesalePriceLabel}
        type="number"
        name="wholesalePrice"
        step="0.01"
        placeholder={es.products.wholesalePricePlaceholder}
        value={data?.wholesalePrice || ""}
        onChange={onChange}
        labelClassName="w-full sm:w-3/6"
      />

      <label className="w-full sm:w-3/6">
        <p>{es.products.description}</p>
        <textarea
          name="description"
          placeholder={es.products.descriptionPlaceholder}
          value={data?.description || ""}
          onChange={onChange}
          className={classnames(
            "rounded-lg",
            "border-slate-400 border",
            "py-2 px-3 h-32",
            "w-full"
          )}
        />
      </label>
      <div className="flex flex-row space-x-5">
        <Button
          disabled={
            data?.name === "" ||
            data?.description === "" ||
            data?.price === undefined
          }
          type="submit"
          name="products"
        >
          {es.save}
        </Button>
        <Link
          to={cancelLink}
          type="button"
          className={classnames(
            "bg-white text-black font-medium",
            "rounded py-1 px-4 shadow",
            "disabled:bg-slate-100 disabled:cursor-not-allowed",
            "disabled:text-slate-300 cursor-pointer"
          )}
        >
          {es.cancel}
        </Link>
      </div>
    </form>
  );
}
