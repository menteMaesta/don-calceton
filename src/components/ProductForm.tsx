import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ProductBase } from "helpers/customTypes";
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
    >
      <Input
        label="Nombre"
        name="name"
        placeholder="Playera"
        value={data?.name || ""}
        onChange={onChange}
        labelClassName="w-full sm:w-3/6"
      />

      <Input
        label="Precio base"
        type="number"
        name="price"
        step="0.01"
        placeholder="150.30"
        value={data?.price || ""}
        onChange={onChange}
        labelClassName="w-full sm:w-3/6"
      />

      <label className="w-full sm:w-3/6">
        <p>Descripción</p>
        <textarea
          name="description"
          placeholder="de algodón cuello redondo holgada"
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
          Guardar
        </Button>
        <Link
          to={cancelLink}
          type="button"
          className={classnames(
            "bg-white text-black font-medium",
            "rounded py-1 px-4 mt-2 shadow",
            "disabled:bg-slate-100 disabled:cursor-not-allowed",
            "disabled:text-slate-300 cursor-pointer"
          )}
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
