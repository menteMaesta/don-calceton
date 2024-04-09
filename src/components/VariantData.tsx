import { useState, ChangeEvent, MouseEvent, Fragment } from "react";
import classnames from "classnames";
import { Variant, VariantBase } from "helpers/customTypes";
import Input from "components/Input";

type Props = {
  variant: Variant;
  onEditData: (data: VariantBase) => void;
};

export default function VariantData({ variant, onEditData }: Props) {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<VariantBase>(variant);
  const [valid, setValid] = useState(true);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(
      (prev) =>
        ({ ...prev, [event.target.name]: event.target.value } as VariantBase)
    );
    if (event.target.name === "quantity") {
      if (event.target.value.includes(".")) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  };

  const onEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (edit) {
      setData((prev) => ({ ...prev, ...variant }));
    }
    setEdit((prev) => !prev);
  };

  const onSave = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onEditData(data);
    setEdit(false);
  };

  return (
    <main
      className={classnames(
        "flex flex-wrap",
        "items-center justify-between",
        "bg-white rounded-md shadow",
        "px-4 py-2",
        "relative"
      )}
      data-testid={`variant-data_${variant.id}`}
    >
      <i
        data-testid="variant-data_edit"
        role="button"
        title="editar"
        onClick={onEdit}
        className={classnames(
          "absolute right-2 top-2",
          "fa-solid fa-pen",
          "text-gray-300",
          "hover:text-gray-500 active:text-gray-500"
        )}
      />
      {edit && (
        <Fragment>
          <button
            data-testid="variant-data_save"
            className={classnames(
              "absolute right-9 top-2",
              "fa-solid fa-check",
              "text-green-600 text-md",
              "hover:text-green-700 active:text-green-700",
              "disabled:text-gray-300 disabled:cursor-not-allowed"
            )}
            onClick={onSave}
            disabled={
              data?.name === "" || data?.quantity === undefined || !valid
            }
          />

          <input
            data-testid="variant-data_name-input"
            name="name"
            placeholder={variant.name}
            value={data.name}
            onChange={onChange}
            className={classnames(
              "rounded-lg",
              "text-2xl font-bold",
              "w-full mr-14 mb-2",
              "px-1",
              "border-slate-400 border"
            )}
          />

          <Input
            data-testid="variant-data_quantity-input"
            label="stock:"
            type="number"
            name="quantity"
            placeholder={`${variant.quantity}`}
            className={classnames(
              "rounded-b rounded-t",
              "pr-1 pl-1",
              "ml-2",
              "pt-0 pb-0"
            )}
            value={data.quantity}
            onChange={onChange}
            labelClassName="flex flex-row"
          />
        </Fragment>
      )}
      {!edit && (
        <Fragment>
          <p
            data-testid="variant-data_name"
            className={classnames(
              "text-2xl font-bold",
              "w-full mb-2",
              "cursor-default"
            )}
          >
            {variant.name}
          </p>
          <p data-testid="variant-data_quantity" className="cursor-default">
            stock: {variant.quantity}
          </p>
        </Fragment>
      )}
    </main>
  );
}
