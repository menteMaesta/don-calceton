import { ChangeEvent, Fragment, useState, useEffect } from "react";
import { useActionData } from "react-router-dom";
import Select, { OnChangeValue } from "react-select";
import imageCompression from "browser-image-compression";
import {
  OrderItem as OrderItemType,
  Option,
  Customization,
  Blob,
} from "helpers/customTypes";
import VariantImageUploader from "components/VariantImageUploader";
import FormItem from "storeComponents/FormItem";
import FileChip from "storeComponents/FileChip";

type Props = {
  item: OrderItemType;
  customizations?: Customization[];
  maxQuantity: number;
  onChange: (field: string, value: number) => void;
  onChangeOrderItemImages: (blobs: Blob[]) => void;
  index: string;
};

export default function OrderItem({
  item,
  customizations = [],
  maxQuantity,
  onChange,
  onChangeOrderItemImages,
  index,
}: Props) {
  const actionData = useActionData() as { isLoading: boolean; index: string };

  const [size, setSize] = useState(item.imageSize || 0);
  const [imageRange, setImageRange] = useState({ min: 0, max: 0 });
  const [loading, setLoading] = useState(false);

  const quantityOptions = new Array(maxQuantity)
    .fill(0)
    .map((_, index) => ({ label: `${index + 1}`, value: index + 1 }));
  const customizationOptions = customizations?.map((customization) => ({
    label: customization.title,
    value: customization.id,
  }));

  useEffect(() => {
    const customization = customizations?.find(
      (customization) => customization.id === item.customizationId
    );
    setImageRange({
      min: customization?.minSize || 0,
      max: customization?.maxSize || 0,
    });
  }, [item.customizationId, customizations]);

  useEffect(() => {
    if (!actionData?.isLoading && actionData?.index === index) {
      setLoading(false);
    }
  }, [actionData, actionData?.isLoading, index]);

  const onChangeQuantity = (option: OnChangeValue<Option, false>) => {
    onChange("quantity", option!.value);
  };

  const onCustomization = (option: OnChangeValue<Option, false>) => {
    const customization = customizations?.find(
      (customization) => customization.id === option?.value
    );
    if (customization) {
      setImageRange({
        min: customization?.minSize || 0,
        max: customization?.maxSize || 0,
      });
      onChange("customizationId", customization.id);
      setSize(0);
    }
  };

  const onChangeSize = (event: ChangeEvent<HTMLInputElement>) => {
    const newSize = parseFloat(event.target.value);
    setSize(newSize);
    onChange("imageSize", newSize);
  };

  const onFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = event.target.files;
    const blobs = [];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (files) {
      for (const file of files) {
        try {
          const compressedFile = await imageCompression(file, options);

          blobs.push({
            src: URL.createObjectURL(file),
            name: file.name,
            file: compressedFile,
          });
        } catch (error) {
          console.log(error);
        }
      }
      onChangeOrderItemImages(blobs);
    }
  };

  return (
    <Fragment>
      <FormItem title="Cantidad">
        <Select
          isSearchable={false}
          onChange={onChangeQuantity}
          defaultValue={{
            label: `${item.quantity}`,
            value: item.quantity,
          }}
          options={quantityOptions}
          placeholder="Cantidad"
        />
      </FormItem>
      <FormItem title="Imagenes">
        <VariantImageUploader
          labelProps={{ className: "w-full text-center" }}
          onFileSelect={onFileSelect}
          isLoading={loading}
        />
        {item.images &&
          item.images?.map((image, key) => (
            <FileChip key={`${image.name}-${key}`} image={image} />
          ))}
      </FormItem>
      <FormItem title="Tipo">
        <Select
          isSearchable={false}
          onChange={onCustomization}
          defaultValue={
            item.customizationId
              ? customizationOptions?.find(
                  (customization) =>
                    customization.value === item.customizationId!
                )
              : undefined
          }
          options={customizationOptions}
          placeholder="Opciones"
        />
      </FormItem>
      <FormItem title="Tamaño (cm)">
        <input
          className="w-full"
          type="range"
          disabled={imageRange.max === 0}
          min={imageRange.min}
          max={imageRange.max}
          step={0.1}
          onChange={onChangeSize}
          value={size}
        />
        {imageRange.max !== 0 && (
          <Fragment>
            <span className="absolute left-0 top-4">{imageRange.min}</span>
            <span className="absolute right-0 top-4">{size}</span>
          </Fragment>
        )}
      </FormItem>
    </Fragment>
  );
}
