import { useState, ChangeEvent, MouseEvent } from "react";
import { useSubmit, useParams, Link } from "react-router-dom";
import classnames from "classnames";
import { VariantBase, Blob } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import ImageCard from "components/ImageCard";

export default function NewVariant() {
  const { productId = "" } = useParams();
  const submit = useSubmit();
  const [data, setData] = useState<VariantBase>();
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [valid, setValid] = useState(true);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const previews = [];
    if (files) {
      for (const file of files) {
        previews.push({
          src: URL.createObjectURL(file),
          name: file.name,
          file,
        });
      }
      setBlobs(previews);
    }
  };

  const onRemoveFile = (event: MouseEvent<HTMLElement>, index: number) => {
    event.preventDefault();
    if (blobs?.length > 0) {
      setBlobs((prev) => prev.filter((_, key) => key !== index));
    }
  };
  const onSave = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("variant", "create");
    formData.append("productId", productId);
    for (const blob of blobs) {
      formData.append("images[]", blob.file, blob.name);
    }
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  return (
    <div className="mt-11 w-full px-4">
      <p className="mt-9 font-semibold text-center text-lg">Nueva variante</p>
      <div className="flex flex-col mt-14 space-y-6 items-center">
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
          {!valid && (
            <p className="text-red-900 text-sm pl-2">
              Solo se pueden guardar valores enteros
            </p>
          )}
        </label>

        <label className="w-fit">
          <p className="bg-slate-700 w-fit p-2 text-white rounded cursor-pointer">
            Imagenes (PNG, JPG)
          </p>
          <input
            className="opacity-0 w-0 h-0 absolute -top-1"
            type="file"
            name="images"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={onFileSelect}
          />
        </label>

        <div className="grid grid-cols-2 gap-2 sm:w-3/6 sm:grid-cols-3">
          {blobs?.map((blob, key) => (
            <ImageCard
              key={key}
              onRemove={(event) => onRemoveFile(event, key)}
              image={blob}
            />
          ))}
        </div>

        <div className="flex flex-row space-x-5">
          <button
            disabled={
              data?.name === "" ||
              data?.quantity === undefined ||
              blobs.length <= 0 ||
              !valid
            }
            type="submit"
            name="variant"
            value="create"
            className={classnames(
              "bg-slate-700 text-white font-medium",
              "rounded py-1 px-4 mt-2",
              "active:bg-slate-800",
              "disabled:bg-slate-300 disabled:cursor-not-allowed"
            )}
            onClick={onSave}
          >
            Guardar
          </button>
          <Link
            to={`${ROUTES.PRODUCT.replace(":productId", productId)}`}
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
      </div>
    </div>
  );
}