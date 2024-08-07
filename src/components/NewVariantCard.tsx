import { DragEvent, ChangeEvent, MouseEvent, Fragment } from "react";
import { es } from "helpers/strings";
import { NewVariantType } from "helpers/customTypes";
import { VARIANT_SELECTORS } from "helpers/test";
import ElementCard from "components/ElementCard";
import TitleInput from "components/TitleInput";
import Input from "components/Input";
import SliderImage from "components/SliderImage";
import VariantImageUploader from "components/VariantImageUploader";
import DragDropImageUploader from "components/DragDropImageUploader";

type Props = {
  variant: NewVariantType;
  index: number;
  setVariants: (value: React.SetStateAction<NewVariantType[]>) => void;
};

export default function NewVariantCard({ variant, index, setVariants }: Props) {
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const previews: NewVariantType["images"] = [];
    const files = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        previews.push({
          id: i,
          src: URL.createObjectURL(files[i]),
          name: files[i].name,
          file: files[i],
        });
      }
    }
    setVariants((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, images: previews } : item
      )
    );
  };

  const handleDropFile = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const previews: NewVariantType["images"] = [];
    const items = event.dataTransfer.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          previews.push({
            id: i,
            src: URL.createObjectURL(file),
            name: file.name,
            file,
          });
        }
      }
    }
    setVariants((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, images: previews } : item
      )
    );
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setVariants((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const handleOnRemove = (
    event: MouseEvent<HTMLElement>,
    variantId: string
  ) => {
    event.preventDefault();
    setVariants((prev) => prev.filter((_, i) => `${i}` !== variantId));
  };

  return (
    <ElementCard
      elementId={`${index}`}
      title={
        <TitleInput
          data-testid={VARIANT_SELECTORS.newName}
          name="name"
          placeholder={es.variants.namePlaceholder}
          value={variant.name}
          onChange={handleOnChange}
          className="!w-11/12 rounded-lg text-2xl mb-2"
        />
      }
      footer={
        <Fragment>
          {variant.images.length > 0 && (
            <VariantImageUploader
              title={es.variants.changeImages}
              className="w-full text-center text-white"
              labelProps={{ className: "w-full dark:bg-slate-800 my-2" }}
              onFileSelect={handleFileSelect}
            />
          )}
          <Input
            data-testid={VARIANT_SELECTORS.newQuantity}
            label={es.variants.stock}
            type="number"
            name="quantity"
            placeholder={es.variants.stockPlaceholder}
            className="!rounded !px-1 !py-0"
            value={variant.quantity}
            onChange={handleOnChange}
            labelClassName="font-semibold"
            otherElements={
              variant.quantity.includes(".") ? (
                <p className={"text-red-900 " + "text-sm pl-2"}>
                  {es.variants.onlyIntegers}
                </p>
              ) : undefined
            }
          />
        </Fragment>
      }
      type={"variant"}
      onRemove={handleOnRemove}
    >
      {variant.images.length === 0 && (
        <DragDropImageUploader
          onFileSelect={handleFileSelect}
          onDropFile={handleDropFile}
        />
      )}
      {variant.images.length > 0 && (
        <SliderImage images={variant.images} type="variant" />
      )}
    </ElementCard>
  );
}
