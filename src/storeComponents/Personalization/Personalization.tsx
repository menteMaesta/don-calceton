import { useState } from "react";
import { useSubmit } from "react-router-dom";
import { PersonalizationType, Customization, Blob } from "helpers/customTypes";
import Quantity from "./components/Quantity";
import ImageSelector from "./components/ImageSelector";
import RangeInput from "./components/RangeInput";
import CustomizationSelector from "./components/CustomizationSelector";

type Props = {
  personalization: PersonalizationType;
  id: number;
  cartItemId: number;
  customizations?: Customization[];
  maxQuantity: number;
};

export default function Personalization({
  personalization,
  id,
  cartItemId,
  customizations = [],
  maxQuantity,
}: Props) {
  const submit = useSubmit();
  const [size, setSize] = useState(personalization.imageSize || 0);

  const onChangeOrderItem = (field: string, newValue: number) => {
    const formData = new FormData();
    formData.append("id", `${cartItemId}`);
    formData.append("store", "updateVariantItem");
    formData.append("personalizationId", `${id}`);
    formData.append("field", `${field}`);
    formData.append("newValue", `${newValue}`);
    submit(formData, { method: "post" });
  };

  const onChangeOrderItemImages = (blobs: Blob[]) => {
    const formData = new FormData();
    formData.append("id", `${cartItemId}`);
    formData.append("store", "updateVariantItemImages");
    formData.append("personalizationId", `${id}`);
    for (const blob of blobs) {
      try {
        formData.append("images[]", blob.file, blob.name);
      } catch (error) {
        console.log(error);
      }
    }
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  const onDeleteOrderItemImages = (imageIndex: number) => {
    const formData = new FormData();
    formData.append("id", `${cartItemId}`);
    formData.append("store", "removeVariantItemImage");
    formData.append("personalizationId", `${id}`);
    formData.append("imageIndex", `${imageIndex}`);
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  return (
    <div>
      <p className="text-sm text-slate-400 mb-2">Personalización {id + 1}:</p>
      <Quantity
        quantity={personalization.quantity}
        maxQuantity={maxQuantity}
        onChange={onChangeOrderItem}
      />
      <ImageSelector
        images={personalization.images}
        onChangeOrderItemImages={onChangeOrderItemImages}
        onDeleteOrderItemImages={onDeleteOrderItemImages}
        index={`${cartItemId}-${id}`}
      />
      <CustomizationSelector
        customizationId={personalization.customizationId}
        customizations={customizations}
        onChange={onChangeOrderItem}
        setSize={setSize}
      />
      <RangeInput
        customizations={customizations}
        customizationId={personalization.customizationId}
        size={size}
        onChange={onChangeOrderItem}
        setSize={setSize}
      />
    </div>
  );
}
