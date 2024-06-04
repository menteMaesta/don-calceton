import { Fragment, MouseEvent, ChangeEvent } from "react";
import classnames from "classnames";
import { Customization } from "helpers/customTypes";
import { es } from "helpers/strings";
import Input from "components/Input";
import SaveButton from "components/SaveButton";
import TitleInput from "components/TitleInput";

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
      <SaveButton
        onClick={onSave}
        disabled={!valid || data.title.length === 0}
        data-testid={`save-customization_${customization.id || ""}`}
        className={classnames({ "!right-2": !isNew, "!right-9": isNew })}
      />
      <TitleInput
        data-testid={`title-edit_${customization.id || ""}`}
        name="title"
        placeholder={customization.title || es.customizations.titlePlaceholder}
        value={data.title}
        onChange={onChange}
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
