import { ChangeEvent, Fragment, SetStateAction } from "react";
import FormItem from "storeComponents/FormItem";
import { Customization } from "helpers/customTypes";
import { ORDER_ITEM_FIELDS } from "helpers/constants";

type Props = {
  customizations?: Customization[];
  customizationId?: number;
  size: number;
  onChange: (field: string, value: number) => void;
  setSize: (value: SetStateAction<number>) => void;
};

export default function RangeInput({
  customizations,
  customizationId,
  size,
  onChange,
  setSize,
}: Props) {
  const customization = customizations?.find(
    (customization) => customization.id === customizationId
  );

  const onChangeSize = (event: ChangeEvent<HTMLInputElement>) => {
    const newSize = parseFloat(event.target.value);
    setSize(newSize);
    onChange(ORDER_ITEM_FIELDS.IMAGE_SIZE, newSize);
  };

  return (
    <FormItem title="Tamaño (cm)" data-testid="order-item_size">
      <input
        data-testid="order-item_size-input"
        className="w-full mb-4"
        type="range"
        disabled={(customization?.maxSize || 0) === 0}
        min={customization?.minSize || 0}
        max={customization?.maxSize || 0}
        step={0.1}
        onChange={onChangeSize}
        value={size}
      />
      {customization?.maxSize !== 0 && (
        <Fragment>
          <span className="absolute left-0 top-4">
            {customization?.minSize}
          </span>
          <span className="absolute right-0 top-4">{size}</span>
        </Fragment>
      )}
    </FormItem>
  );
}
