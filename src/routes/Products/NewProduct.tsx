import { useState, ChangeEvent } from "react";
import { useNavigate, Form } from "react-router-dom";
import classnames from "classnames";
import { ProductBase } from "helpers/customTypes";

export default function NewProduct() {
  const navigate = useNavigate();
  const [data, setData] = useState<ProductBase>();

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData(
      (prev) =>
        ({ ...prev, [event.target.name]: event.target.value } as ProductBase)
    );
  };
  return (
    <div className="mt-11 w-full px-4">
      <p className="mt-9 font-semibold text-center text-lg">Nuevo producto</p>
      <Form
        className="flex flex-col mt-14 space-y-6 items-center"
        method="post"
      >
        <label className="w-full sm:w-3/6">
          <p>Nombre</p>
          <input
            name="name"
            placeholder="Playera"
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
          <p>Precio base</p>
          <input
            type="number"
            name="price"
            step="0.01"
            placeholder="150.30"
            value={data?.price || ""}
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
          <input
            disabled={
              data?.name === "" ||
              data?.description === "" ||
              data?.price === undefined
            }
            type="submit"
            value="Guardar"
            className={classnames(
              "bg-slate-700 text-white font-medium",
              "rounded py-1 px-4 mt-2",
              "active:bg-slate-800 cursor-pointer",
              "disabled:bg-slate-300 disabled:cursor-not-allowed"
            )}
          />
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
