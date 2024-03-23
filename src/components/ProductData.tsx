import { useState, MouseEvent, ChangeEvent, Fragment } from "react";
import classnames from "classnames";
import { Product, ProductBase } from "helpers/customTypes";

type Props = {
  product: Product;
  onEditData: (data: ProductBase) => void;
};

export default function ProductData({ product, onEditData }: Props) {
  const [data, setData] = useState<ProductBase>(product);
  const [showHide, setShowHide] = useState<string>("line-clamp-4");
  const [edit, setEdit] = useState(false);

  const onShowHide = () => {
    setShowHide((prev) => (prev ? "" : "line-clamp-4"));
  };

  const onEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (edit) {
      setData((prev) => ({ ...prev, ...product }));
    }
    setEdit((prev) => !prev);
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData(
      (prev) =>
        ({ ...prev, [event.target.name]: event.target.value } as ProductBase)
    );
  };

  const onSave = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onEditData(data);
    setEdit(false);
  };

  return (
    <main
      className={classnames(
        "flex flex-wrap flex-col",
        "justify-between",
        "bg-white relative",
        "px-4 py-2",
        "rounded-md shadow"
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
          disabled={
            data?.name === "" ||
            data?.description === undefined ||
            data?.price === undefined
          }
        />
      )}

      {!edit && (
        <Fragment>
          <p className="text-2xl w-2/5 font-bold">{data.name}</p>
          <p
            className={classnames(
              "bg-black text-white",
              "w-fit",
              "rounded-full px-2"
            )}
          >
            Precio base: ${data.price}
          </p>
          <p className={classnames(showHide, "w-full pt-2 overflow-hidden")}>
            {data.description}
          </p>
          <button
            className={classnames(
              "text-gray-300 text-start",
              "hover:text-gray-500",
              "active:text-gray-500",
              "cursor-pointer leading-4"
            )}
            onClick={onShowHide}
          >
            mas...
          </button>
        </Fragment>
      )}

      {edit && (
        <Fragment>
          <input
            name="name"
            placeholder={product.name}
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
          <label className="flex flex-row">
            <p className="mr-2">precio base:</p>
            <input
              type="number"
              name="price"
              placeholder={`${product.price}`}
              value={data.price}
              onChange={onChange}
              className={classnames("border-slate-400 border", "rounded px-1")}
            />
          </label>
          <textarea
            name="description"
            placeholder={product.description}
            value={data.description}
            onChange={onChange}
            className={classnames(
              "rounded-lg",
              "w-10/12 mt-2",
              "px-1",
              "border-slate-400 border"
            )}
          />
        </Fragment>
      )}
    </main>
  );
}
