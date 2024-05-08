import { CartItem } from "helpers/customTypes";
import SliderImageCard from "components/SliderImageCard";
import OrderItem from "./OrderItem";

type Props = {
  item: CartItem;
};

export default function VariantImageSlider({ item }: Props) {
  return (
    <div
      className={
        "flex w-full " +
        "flex-row flex-wrap " +
        "bg-white items-start " +
        "justify-center " +
        "py-4 rounded"
      }
    >
      <SliderImageCard
        title={item.name}
        images={item.images || []}
        elementId={`${item.id}`}
        type="variant"
        footer
        className="shadow-none"
        imageClassName="max-w-64 mr-5"
      />
      <div className="w-full mx-4">
        <p className="mt-2 font-medium">Personalización</p>
        {item.personalizations?.map((orderItem) => (
          <OrderItem item={orderItem} maxQuantity={item.quantity || 0} />
        ))}
      </div>
    </div>
  );
}
