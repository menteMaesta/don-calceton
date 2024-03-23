import { useState, ChangeEvent, MouseEvent } from "react";
import classnames from "classnames";
import { Variant, VariantBase } from "helpers/customTypes";

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
    >
      <i
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
        <button
          className={classnames(
            "absolute right-9 top-2",
            "fa-solid fa-check",
            "text-green-600 text-md",
            "hover:text-green-700 active:text-green-700",
            "disabled:text-gray-300 disabled:cursor-not-allowed"
          )}
          onClick={onSave}
          disabled={data?.name === "" || data?.quantity === undefined || !valid}
        />
      )}
      {!edit && (
        <p
          className={classnames(
            "text-2xl font-bold",
            "w-full mb-2",
            "cursor-default"
          )}
        >
          {variant.name}
        </p>
      )}
      {!edit && <p className="cursor-default">stock: {variant.quantity}</p>}

      {edit && (
        <input
          name="name"
          placeholder={variant.name}
          value={data.name}
          onChange={onChange}
          className={classnames(
            "rounded-lg",
            "text-2xl font-bold",
            "w-10/12 mb-2",
            "px-1",
            "border-slate-400 border"
          )}
        />
      )}
      {edit && (
        <label className="flex flex-row">
          <p className="mr-2">stock:</p>
          <input
            type="number"
            name="quantity"
            placeholder={`${variant.quantity}`}
            value={data.quantity}
            onChange={onChange}
            className={classnames("border-slate-400 border", "rounded px-1")}
          />
          {!valid && (
            <p className="text-red-900 text-sm pl-2">Solo valores enteros</p>
          )}
        </label>
      )}
    </main>
  );
}
