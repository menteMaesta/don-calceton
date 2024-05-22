import Select, { OnChangeValue } from "react-select";
import { Option } from "helpers/customTypes";
import { ORDER_ITEM_FIELDS } from "helpers/constants";
import FormItem from "storeComponents/FormItem";

type Props = {
  quantity: number;
  maxQuantity: number;
  onChange: (field: string, value: number) => void;
};

export default function QuantitySelector({
  quantity,
  maxQuantity,
  onChange,
}: Props) {
  //create an array of options from 1 to maxQuantity
  const quantityOptions = new Array(maxQuantity)
    .fill(0)
    .map((_, index) => ({ label: `${index + 1}`, value: index + 1 }));

  const onSelectQuantity = (option: OnChangeValue<Option, false>) => {
    if (option?.value) {
      onChange(ORDER_ITEM_FIELDS.QUANTITY, option.value);
    }
  };

  return (
    <FormItem title="Cantidad" data-testid="order-item_quantity">
      <Select
        isSearchable={false}
        onChange={onSelectQuantity}
        defaultValue={{
          label: `${quantity}`,
          value: quantity,
        }}
        options={quantityOptions}
        placeholder="Cantidad"
      />
    </FormItem>
  );
}
