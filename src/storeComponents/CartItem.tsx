import { MouseEvent } from "react";
import { useSubmit } from "react-router-dom";
import { CartItemType } from "helpers/customTypes";
import SliderImageCard from "components/SliderImageCard";
import Button from "components/Button";
import Personalization from "storeComponents/Personalization/Personalization";

type Props = {
  item: CartItemType;
  onRemove?: (event: MouseEvent<HTMLElement>, productId: string) => void;
};

export default function CartItem({ item, onRemove }: Props) {
  const submit = useSubmit();

  const onAddPersonalization = () => {
    const formData = new FormData();
    formData.append("id", `${item.id}`);
    formData.append("store", "addVariantPersonalization");
    submit(formData, { method: "post" });
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
        <div
          className="w-full relative pt-7"
          data-testid="personalization_list"
        >
          <Button
            className={
              "font-normal my-2 " +
              "absolute -top-9 " +
              "right-0 " +
              "flex items-center"
            }
            onClick={onAddPersonalization}
          >
            <i className="fa-solid fa-plus pr-1" />
            personalización
          </Button>
          {item.personalizations?.map((personalization, key) => (
            <Personalization
              key={`${item.id}-${key}`}
              id={key}
              personalization={personalization}
              cartItemId={item.id}
              customizations={item.customizations}
              maxQuantity={item.quantity || 0}
            />
          ))}
        </div>
      }
    />
  );
}
