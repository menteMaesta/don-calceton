import { SetStateAction } from "react";
import { OnChangeValue } from "react-select";
import { Option, Customization } from "helpers/customTypes";
import { ORDER_ITEM_FIELDS } from "helpers/constants";
import FormItem from "storeComponents/FormItem";
import Select from "components/Select";

type Props = {
  customizationId?: number;
  customizations?: Customization[];
  onChange: (field: string, value: number) => void;
  setSize: (value: SetStateAction<number>) => void;
};

export default function CustomizationSelector({
  customizationId,
  customizations = [],
  onChange,
  setSize,
}: Props) {
  const customizationOptions = customizations?.map((customization) => ({
    label: customization.title,
    value: customization.id,
  }));
  const defaultCustomization = customizationId
    ? customizationOptions?.find(
        (customization) => customization.value === customizationId!
      )
    : undefined;

  const onCustomization = (option: OnChangeValue<Option, false>) => {
    const customization = customizations?.find(
      (customization) => customization.id === option?.value
    );
    if (customization) {
      onChange(ORDER_ITEM_FIELDS.CUSTOMIZATION_ID, customization.id);
      setSize(0);
    }
  };

  return (
    <FormItem title="Tipo" data-testid="order-item_customization">
      <Select
        isSearchable={false}
        onChange={onCustomization}
        defaultValue={defaultCustomization}
        options={customizationOptions}
        placeholder="Opciones"
      />
    </FormItem>
  );
}
