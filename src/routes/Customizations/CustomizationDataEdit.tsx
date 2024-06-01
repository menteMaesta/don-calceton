import { Fragment, MouseEvent, ChangeEvent } from "react";
import classnames from "classnames";
import { Customization } from "helpers/customTypes";
import { es } from "helpers/strings";
import Input from "components/Input";

type Props = {
  onSave: (event: MouseEvent<HTMLElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  data: Customization;
  customization: Customization;
  isNew?: boolean;
  valid: boolean;
};

export default function CustomizationDataEdit({
  onSave,
  data,
  customization,
  isNew,
  valid,
  onChange,
}: Props) {
  return (
    <Fragment>
      <button
        className={classnames(
          "absolute top-2",
          "fa-solid fa-check",
          "text-green-600 text-md",
          "hover:text-green-700 active:text-green-700",
          "disabled:text-gray-300 disabled:cursor-not-allowed",
          { "right-2": !isNew, "right-9": isNew }
        )}
        onClick={onSave}
        disabled={!valid || data.title.length === 0}
        data-testid={`save-customization_${customization.id || ""}`}
      />
      <input
        data-testid={`title-edit_${customization.id || ""}`}
        name="title"
        placeholder={customization.title || es.customizations.titlePlaceholder}
        value={data.title}
        onChange={onChange}
        className={
          "rounded " +
          "font-bold " +
          "w-full sm:mb-2 " +
          "px-1 " +
          "border-slate-400 border " +
          "dark:border-slate-800 " +
          "dark:bg-slate-800 " +
          "dark:focus-visible:border-slate-400 " +
          "focus-visible:outline-0"
        }
      />
      <Input
        data-testid={`min-size-edit_${customization.id || ""}`}
        label={es.customizations.imageMin}
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
        data-testid={`max-size-edit_${customization.id || ""}`}
        label={es.customizations.imageMax}
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
  );
}
