import { Fragment } from "react";
import Select, { OnChangeValue } from "react-select";
import Slider from "react-input-slider";
import { OrderItem as OrderItemType, Option } from "helpers/customTypes";
import VariantImageUploader from "components/VariantImageUploader";

type Props = {
  item: OrderItemType;
  maxQuantity: number;
  onChangeQuantity: (option: OnChangeValue<Option, false>) => void;
};

export default function OrderItem({
  item,
  maxQuantity,
  onChangeQuantity,
}: Props) {
  const options = new Array(maxQuantity)
    .fill(0)
    .map((_, index) => ({ label: `${index + 1}`, value: index + 1 }));

  return (
    <Fragment>
      <label className="flex items-center space-x-2">
        <span>Cantidad: </span>
        <Select
          isSearchable={false}
          onChange={onChangeQuantity}
          defaultValue={{
            label: `${item.quantity}`,
            value: item.quantity,
          }}
          options={options}
          styles={{
            container: (baseStyles) => ({ ...baseStyles, width: "100%" }),
            control: (baseStyles) => ({
              ...baseStyles,
              width: "100%",
            }),
          }}
          placeholder="Cantidad"
        />
      </label>
      <label className="flex items-center space-x-2 mt-2">
        <span>Tipo: </span>
        <Select
          isSearchable={false}
          isDisabled
          onChange={() => {}}
          options={[]}
          placeholder="Opciones"
          styles={{
            container: (baseStyles) => ({ ...baseStyles, width: "100%" }),
            control: (baseStyles) => ({
              ...baseStyles,
              width: "100%",
            }),
          }}
        />
      </label>
      <label className="flex items-center space-x-2 mt-2">
        <span>Imagenes: </span>
        <VariantImageUploader
          className="w-full"
          inputProps={{ disabled: true }}
          labelProps={{
            className: "w-full text-center bg-gray-200 cursor-not-allowed",
          }}
          onFileSelect={() => {}}
        />
      </label>
      <label className="flex items-center space-x-2 mt-2">
        <span>Tamaño:</span>
        <Slider axis="x" onChange={() => {}} disabled />
      </label>
    </Fragment>
  );
}
