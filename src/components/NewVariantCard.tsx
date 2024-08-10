import { DragEvent, ChangeEvent, MouseEvent, Fragment, useState } from "react";
import classnames from "classnames";
import imageCompression from "browser-image-compression";
import { useSnackbar } from "react-simple-snackbar";
import { es } from "helpers/strings";
import { NewVariantType } from "helpers/customTypes";
import { VARIANT_SELECTORS } from "helpers/test";
import ElementCard from "components/ElementCard";
import TitleInput from "components/TitleInput";
import Input from "components/Input";
import SliderImage from "components/SliderImage";
import VariantImageUploader from "components/VariantImageUploader";
import DragDropImageUploader from "components/DragDropImageUploader";
import SaveButton from "components/SaveButton";

type Props = {
  variant: NewVariantType;
  index: number;
  setVariants: (value: React.SetStateAction<NewVariantType[]>) => void;
  onSave?: (event: MouseEvent<HTMLElement>) => void;
};

export default function NewVariantCard({
  variant,
  index,
  setVariants,
  onSave,
}: Props) {
  const [openSnackbar] = useSnackbar();
  const [loading, setLoading] = useState(false);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const previews: NewVariantType["images"] = [];
    const files = event.target.files;
    setLoading(true);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        try {
          const compressedFile = await imageCompression(files[i], options);
          previews.push({
            id: i,
            src: URL.createObjectURL(files[i]),
            name: files[i].name,
            file: compressedFile,
          });
        } catch (error) {
          openSnackbar(error);
        }
      }
    }
    setVariants((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, images: previews } : item
      )
    );
    setLoading(false);
  };

  const handleDropFile = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const previews: NewVariantType["images"] = [];
    const items = event.dataTransfer.files;
    setLoading(true);

    for (let i = 0; i < items.length; i++) {
      const file = items[i];
      if (file) {
        try {
          const compressedFile = await imageCompression(file, options);
          previews.push({
            id: i,
            src: URL.createObjectURL(file),
            name: file.name,
            file: compressedFile,
          });
        } catch (error) {
          openSnackbar(error);
        }
      }
    }
    setVariants((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, images: previews } : item
      )
    );
    setLoading(false);
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
        <>
          <TitleInput
            data-testid={VARIANT_SELECTORS.newName}
            name="name"
            placeholder={es.variants.namePlaceholder}
            value={variant.name}
            onChange={handleOnChange}
            className={classnames("rounded-lg text-2xl mb-2", {
              "!w-10/12 sm:!w-9/12": onSave,
              "!w-11/12": !onSave,
            })}
          />
          {onSave && (
            <SaveButton
              onClick={onSave}
              disabled={
                variant.name.length === 0 ||
                variant.quantity.length === 0 ||
                variant.quantity.includes(".") ||
                variant.images.length === 0
              }
              className={"!right-9"}
              data-testid={VARIANT_SELECTORS.newSubmit}
            />
          )}
        </>
      }
      footer={
        <Fragment>
          {variant.images.length > 0 && (
            <VariantImageUploader
              title={es.variants.changeImages}
              className="w-full text-center text-white"
              labelProps={{ className: "w-full dark:bg-slate-800 my-2" }}
              onFileSelect={handleFileSelect}
              isLoading={loading}
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
          isLoading={loading}
        />
      )}
      {variant.images.length > 0 && (
        <SliderImage images={variant.images} type="variant" />
      )}
    </ElementCard>
  );
}
