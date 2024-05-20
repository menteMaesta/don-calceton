import { MouseEvent } from "react";
import { useSubmit } from "react-router-dom";
import { CartItem, Blob } from "helpers/customTypes";
import SliderImageCard from "components/SliderImageCard";
import OrderItem from "./OrderItem";

type Props = {
  item: CartItem;
  onRemove?: (event: MouseEvent<HTMLElement>, productId: string) => void;
};

export default function VariantImageSlider({ item, onRemove }: Props) {
  const submit = useSubmit();

  const onChangeOrderItem = (
    orderId: number,
    field: string,
    newValue: number
  ) => {
    const formData = new FormData();
    formData.append("id", `${item.id}`);
    formData.append("store", "updateVariantItem");
    formData.append("orderId", `${orderId}`);
    formData.append("field", `${field}`);
    formData.append("newValue", `${newValue}`);
    submit(formData, { method: "post" });
  };

  const onChangeOrderItemImages = (orderId: number, blobs: Blob[]) => {
    const formData = new FormData();
    formData.append("id", `${item.id}`);
    formData.append("store", "updateVariantItemImages");
    formData.append("orderId", `${orderId}`);
    for (const blob of blobs) {
      try {
        formData.append("images[]", blob.file, blob.name);
      } catch (error) {
        console.log(error);
      }
    }
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  const onDeleteOrderItemImages = (orderId: number, imageIndex: number) => {
    const formData = new FormData();
    formData.append("id", `${item.id}`);
    formData.append("store", "removeVariantItemImage");
    formData.append("orderId", `${orderId}`);
    formData.append("imageIndex", `${imageIndex}`);
    submit(formData, { method: "post", encType: "multipart/form-data" });
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
        <div className="w-full" data-testid="personalization_list">
          <p className="mt-2 font-medium">Personalización</p>
          {item.personalizations?.map((orderItem, key) => (
            <OrderItem
              item={orderItem}
              customizations={item.customizations}
              maxQuantity={item.quantity || 0}
              key={`${item.id}-${key}`}
              onChange={(field, value) => onChangeOrderItem(key, field, value)}
              onChangeOrderItemImages={(blobs) =>
                onChangeOrderItemImages(key, blobs)
              }
              onDeleteOrderItemImages={(imageIndex) =>
                onDeleteOrderItemImages(key, imageIndex)
              }
              index={`${item.id}-${key}`}
            />
          ))}
        </div>
      }
    />
  );
}
