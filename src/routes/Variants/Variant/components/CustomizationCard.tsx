import { useState, Fragment, MouseEvent } from "react";
import { Customization } from "helpers/customTypes";
import Input from "components/Input";

type Props = {
  customization: Customization;
};

export default function CustomizationCard({ customization }: Props) {
  const [edit, setEdit] = useState(false);
  const onEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setEdit((prev) => !prev);
  };
  return (
    <div className="bg-white px-2 py-1 pr-14 mb-3 rounded relative">
      <i
        data-testid="variant-data_edit"
        role="button"
        title="editar"
        onClick={onEdit}
        className={
          "absolute right-2 top-2 " +
          "fa-solid fa-pen " +
          "text-gray-300 " +
          "hover:text-gray-500 active:text-gray-500"
        }
      />
      {!edit && (
        <Fragment>
          <p className="font-bold">{customization.title}</p>
          <p>Imagen min: {customization.minSize} cm</p>
          <p>Imagen max: {customization.maxSize} cm</p>
        </Fragment>
      )}
      {edit && (
        <Fragment>
          <input
            name="title"
            placeholder={customization.title}
            value={customization.title}
            onChange={() => {}}
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
            value={customization.minSize}
            onChange={() => {}}
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
            value={customization.maxSize}
            onChange={() => {}}
            labelClassName="flex flex-col sm:flex-row"
          />
        </Fragment>
      )}
    </div>
  );
}
