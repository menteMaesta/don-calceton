import { useState, useEffect, Fragment, MouseEvent, ChangeEvent } from "react";
import { Customization } from "helpers/customTypes";
import Input from "components/Input";

type Props = {
  customization: Customization;
  onSaveData: (data: Customization) => void;
  onRemove?: (event: MouseEvent<HTMLElement>, id: string) => void;
  isNew?: boolean;
};

export default function CustomizationCard({
  customization,
  onSaveData,
  onRemove,
  isNew = false,
}: Props) {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<Customization>(customization);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (isNew) {
      setEdit(true);
    }
  }, [isNew]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(
      (prev) =>
        ({ ...prev, [event.target.name]: event.target.value } as Customization)
    );
    if (event.target.name === "minSize" || event.target.name === "maxSize") {
      if (event.target.value.includes("-") || event.target.value.length === 0) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  };

  const onEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setEdit((prev) => !prev);
  };

  const onSave = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setEdit(false);
    onSaveData(data);
  };

  return (
    <div className="bg-white px-2 py-1 pr-24 rounded relative shadow">
      <button
        onClick={onEdit}
        className={
          "absolute right-9 top-2 " +
          "fa-solid fa-pen " +
          "text-gray-300 " +
          "hover:text-gray-500 active:text-gray-500"
        }
      />
      {onRemove && !edit && (
        <button
          onClick={(event) => onRemove(event, `${customization.id}`)}
          className={
            "absolute right-2 top-2 " +
            "fa-solid fa-circle-xmark " +
            "text-gray-300 z-[1] " +
            "hover:text-gray-500 active:text-gray-500"
          }
        />
      )}
      {!edit && (
        <Fragment>
          <p className="font-bold">{customization.title}</p>
          <p>Imagen min: {customization.minSize} cm</p>
          <p>Imagen max: {customization.maxSize} cm</p>
        </Fragment>
      )}
      {edit && (
        <Fragment>
          <button
            className={
              "absolute right-2 top-2 " +
              "fa-solid fa-check " +
              "text-green-600 text-md " +
              "hover:text-green-700 active:text-green-700 " +
              "disabled:text-gray-300 disabled:cursor-not-allowed"
            }
            onClick={onSave}
            disabled={!valid || data.title.length === 0}
          />
          <input
            name="title"
            placeholder={customization.title || "Esquina superior izquierda"}
            value={data.title}
            onChange={onChange}
            className={
              "rounded " +
              "font-bold " +
              "w-full sm:mb-2 " +
              "px-1 " +
              "border-slate-400 border"
            }
          />
          <Input
            label="Imagen min:"
            type="number"
            name="minSize"
            className={
              "rounded-b rounded-t " +
              "pr-1 pl-1 " +
              "sm:ml-2 !w-fit mb-1 " +
              "pt-0 pb-0"
            }
            value={data.minSize}
            placeholder={`${customization.minSize}`}
            onChange={onChange}
            labelClassName="flex flex-col sm:flex-row"
          />
          <Input
            label="Imagen max:"
            type="number"
            name="maxSize"
            className={
              "rounded-b rounded-t " +
              "pr-1 pl-1 " +
              "sm:ml-2 !w-fit " +
              "pt-0 pb-0"
            }
            value={data.maxSize}
            placeholder={`${customization.maxSize}`}
            onChange={onChange}
            labelClassName="flex flex-col sm:flex-row"
          />
        </Fragment>
      )}
    </div>
  );
}
