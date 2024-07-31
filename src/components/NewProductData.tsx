import { ChangeEvent } from "react";
import { es } from "helpers/strings";
import { ProductBase } from "helpers/customTypes";
import TitleInput from "components/TitleInput";
import Input from "components/Input";

type Props = {
  data: ProductBase;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};
export default function NewProductData({ data, onChange }: Props) {
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
    >
      <TitleInput
        name="name"
        placeholder={es.products.namePlaceholder}
        value={data.name}
        onChange={onChange}
        className="rounded-lg text-2xl mr-14 mb-2"
      />
      <div className="flex items-center space-x-2 w-full">
        <Input
          label={es.products.basePrice}
          type="number"
          name="price"
          placeholder={es.products.pricePlaceholder}
          className={"rounded-b rounded-t " + "pr-1 pl-1 " + "pt-0 pb-0"}
          value={data.price}
          onChange={onChange}
          labelClassName="font-semibold"
        />
        <Input
          label={es.products.wholesalePriceLabel}
          type="number"
          name="wholesalePrice"
          placeholder={es.products.wholesalePricePlaceholder}
          className={"rounded-b rounded-t " + "pr-1 pl-1 " + "pt-0 pb-0"}
          value={data.wholesalePrice}
          onChange={onChange}
          labelClassName="font-semibold"
        />
      </div>

      <label className="w-full pt-2 dark:text-slate-200">
        <p className="font-semibold">{es.products.description}</p>
        <textarea
          name="description"
          placeholder={es.products.descriptionPlaceholder}
          value={data.description}
          onChange={onChange}
          className={
            "rounded-lg " +
            "border-slate-400 border " +
            "py-2 px-3 h-14 " +
            "w-full " +
            "dark:bg-slate-900 dark:border-slate-900 " +
            "dark:placeholder:text-slate-500"
          }
        />
      </label>
    </main>
  );
}
