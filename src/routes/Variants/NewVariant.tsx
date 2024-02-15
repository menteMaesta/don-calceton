import { useState, ChangeEvent } from "react";
import { useNavigate, Form } from "react-router-dom";
import classnames from "classnames";
import { VariantBase } from "helpers/customTypes";

export default function NewVariant() {
  const navigate = useNavigate();
  const [data, setData] = useState<VariantBase>();

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData(
      (prev) =>
        ({ ...prev, [event.target.name]: event.target.value } as VariantBase)
    );
  };
  return (
    <div className="mt-11 w-full px-4">
      <p className="mt-9 font-semibold text-center text-lg">Nueva variante</p>
      <Form
        className="flex flex-col mt-14 space-y-6 items-center"
        method="post"
      >
        <label className="w-full sm:w-3/6">
          <p>Nombre</p>
          <input
            name="name"
            placeholder="Playera rosa"
            value={data?.name || ""}
            onChange={onChange}
            className={classnames(
              "rounded-lg",
              "border-slate-400 border",
              "py-2 px-3",
              "w-full"
            )}
          />
        </label>
        <label className="w-full sm:w-3/6">
          <p>Stock</p>
          <input
            type="number"
            name="quantity"
            step="1"
            placeholder="50"
            value={data?.quantity || ""}
            onChange={onChange}
            className={classnames(
              "rounded-lg",
              "border-slate-400 border",
              "py-2 px-3",
              "w-full"
            )}
          />
        </label>
        <div className="flex flex-row space-x-5">
          <button
            disabled={data?.name === "" || data?.quantity === ""}
            type="submit"
            name="products"
            value="create"
            className={classnames(
              "bg-slate-700 text-white font-medium",
              "rounded py-1 px-4 mt-2",
              "active:bg-slate-800",
              "disabled:bg-slate-300 disabled:cursor-not-allowed"
            )}
          >
            Guardar
          </button>
          <input
            type="button"
            value="Cancelar"
            onClick={() => navigate(-1)}
            className={classnames(
              "bg-white text-black font-medium",
              "rounded py-1 px-4 mt-2 shadow",
              "disabled:bg-slate-100 disabled:cursor-not-allowed",
              "disabled:text-slate-300 cursor-pointer"
            )}
          />
        </div>
      </Form>
    </div>
  );
}
