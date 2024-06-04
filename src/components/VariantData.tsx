import { useState, ChangeEvent, MouseEvent, Fragment } from "react";
import { Variant, VariantBase } from "helpers/customTypes";
import { es } from "helpers/strings";
import Input from "components/Input";
import EditButton from "components/EditButton";
import SaveButton from "components/SaveButton";

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
      if (
        event.target.value.includes(".") ||
        event.target.value.includes("-") ||
        event.target.value.length === 0
      ) {
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
      className={
        "flex flex-wrap " +
        "items-center justify-between " +
        "bg-white rounded-md shadow " +
        "px-4 py-2 " +
        "relative dark:bg-slate-700 dark:text-slate-200 "
      }
      data-testid={`variant-data_${variant.id}`}
    >
      <EditButton
        data-testid="variant-data_edit"
        onClick={onEdit}
        className="!right-2"
      />
      {edit && (
        <Fragment>
          <SaveButton
            data-testid="variant-data_save"
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
            className={
              "rounded-lg " +
              "text-2xl font-bold " +
              "w-full mr-14 mb-2 " +
              "px-1 " +
              "border-slate-400 border"
            }
          />

          <Input
            data-testid="variant-data_quantity-input"
            label={es.stock}
            type="number"
            name="quantity"
            placeholder={`${variant.quantity}`}
            className={
              "rounded-b rounded-t " + "pr-1 pl-1 " + "ml-2 " + "pt-0 pb-0"
            }
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
            className={
              "text-2xl font-bold " +
              "w-full mb-2 " +
              "cursor-default " +
              "dark:text-slate-100"
            }
          >
            {variant.name}
          </p>
          <p data-testid="variant-data_quantity" className="cursor-default">
            {es.stock} {variant.quantity}
          </p>
        </Fragment>
      )}
    </main>
  );
}
