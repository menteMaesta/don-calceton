import { SetStateAction } from "react";
import Select, { OnChangeValue } from "react-select";
import { Option, Customization } from "helpers/customTypes";
import FormItem from "storeComponents/FormItem";

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
      onChange("customizationId", customization.id);
      setSize(0);
    }
  };

  return (
    <FormItem title="Tipo" data-testid="order-item_customization">
      <Select
        data-testid="order-item_customization-select"
        isSearchable={false}
        onChange={onCustomization}
        defaultValue={defaultCustomization}
        options={customizationOptions}
        placeholder="Opciones"
      />
    </FormItem>
  );
}
