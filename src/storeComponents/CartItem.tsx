import { MouseEvent } from "react";
import { useSubmit } from "react-router-dom";
import { Accordion, AccordionItem } from "@reach/accordion";
import { CartItemType } from "helpers/customTypes";
import SliderImageCard from "components/SliderImageCard";
import Button from "components/Button";
import Prices from "components/Prices";
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
        <Accordion
          className="w-full relative pt-7"
          data-testid="personalization_list"
          multiple
          collapsible
          defaultIndex={0}
        >
          <Prices
            id={item.id}
            price={item.productPrice || 0}
            wholesalePrice={item.productWholesalePrice || 0}
            className="items-start absolute -top-10 left-0"
          />
          <Button
            className={
              "font-normal my-2 " +
              "sm:absolute -top-9 " +
              "right-0 text-white " +
              "flex items-center " +
              "sm:text-sm bg-slate-800 " +
              "dark:!bg-slate-500 dark:hover:!bg-slate-600"
            }
            onClick={onAddPersonalization}
          >
            <i className="fa-solid fa-plus pr-1" />
            personalización
          </Button>
          {item.personalizations?.map((personalization, key) => (
            <AccordionItem key={`${item.id}-${key}`} className="relative">
              <Personalization
                id={key}
                personalization={personalization}
                cartItemId={item.id}
                customizations={item.customizations}
                maxQuantity={item.quantity || 0}
              />
            </AccordionItem>
          ))}
        </Accordion>
      }
    />
  );
}
