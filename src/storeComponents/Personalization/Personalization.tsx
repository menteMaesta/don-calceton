import { useState } from "react";
import {
  OrderItem as OrderItemType,
  Customization,
  Blob,
} from "helpers/customTypes";
import Quantity from "./components/Quantity";
import ImageSelector from "./components/ImageSelector";
import RangeInput from "./components/RangeInput";
import CustomizationSelector from "./components/CustomizationSelector";

const SECOND_ITEM_INDEX = 1;

type Props = {
  item: OrderItemType;
  customizations?: Customization[];
  maxQuantity: number;
  onChange: (field: string, value: number) => void;
  onChangeOrderItemImages: (blobs: Blob[]) => void;
  onDeleteOrderItemImages: (imageIndex: number) => void;
  index: string;
};

export default function Personalization({
  item,
  customizations = [],
  maxQuantity,
  onChange,
  onChangeOrderItemImages,
  onDeleteOrderItemImages,
  index,
}: Props) {
  // Split the index to get the personalization key, add 1 because it starts at 0
  const personalizationNumber = Number(index.split("-")[SECOND_ITEM_INDEX]) + 1;

  const [size, setSize] = useState(item.imageSize || 0);

  return (
    <div>
      <p className="text-sm text-slate-400 mb-2">
        Personalización {personalizationNumber}:
      </p>
      <Quantity
        quantity={item.quantity}
        maxQuantity={maxQuantity}
        onChange={onChange}
      />
      <ImageSelector
        images={item.images}
        onChangeOrderItemImages={onChangeOrderItemImages}
        onDeleteOrderItemImages={onDeleteOrderItemImages}
        index={index}
      />
      <CustomizationSelector
        customizationId={item.customizationId}
        customizations={customizations}
        onChange={onChange}
        setSize={setSize}
      />
      <RangeInput
        customizations={customizations}
        customizationId={item.customizationId}
        size={size}
        onChange={onChange}
        setSize={setSize}
      />
    </div>
  );
}
