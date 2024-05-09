import { MouseEvent } from "react";
import { OnChangeValue } from "react-select";
import { CartItem, Option } from "helpers/customTypes";
import SliderImageCard from "components/SliderImageCard";
import OrderItem from "./OrderItem";

type Props = {
  item: CartItem;
  onRemove?: (event: MouseEvent<HTMLElement>, productId: string) => void;
  handleChangeQuantity?: (
    variantId: string,
    quantity: number,
    personalizationId: string
  ) => void;
};

export default function VariantImageSlider({
  item,
  onRemove,
  handleChangeQuantity = () => {},
}: Props) {
  const onChangeQuantity = (
    option: OnChangeValue<Option, false>,
    personalizationId: number
  ) => {
    handleChangeQuantity(`${item.id}`, option!.value, `${personalizationId}`);
  };

  return (
    <SliderImageCard
      title={item.name}
      images={item.images || []}
      elementId={`${item.id}`}
      type="variant"
      className="shadow-none w-full px-4 pb-4"
      imageClassName="max-w-64 mr-5"
      onRemove={onRemove}
      footer={
        <div className="w-full">
          <p className="mt-2 font-medium">Personalización</p>
          {item.personalizations?.map((orderItem, key) => (
            <OrderItem
              item={orderItem}
              maxQuantity={item.quantity || 0}
              key={`${item.id}-${key}`}
              onChangeQuantity={(option) => onChangeQuantity(option, key)}
            />
          ))}
        </div>
      }
    />
  );
}
