import { ChangeEvent, useState, useEffect } from "react";
import { useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import imageCompression from "browser-image-compression";
import { OrderImage, Blob } from "helpers/customTypes";
import VariantImageUploader from "components/VariantImageUploader";
import FormItem from "storeComponents/FormItem";
import FileChip from "storeComponents/FileChip";

type Props = {
  images?: OrderImage[];
  onChangeOrderItemImages: (blobs: Blob[]) => void;
  onDeleteOrderItemImages: (imageIndex: number) => void;
  index: string;
};

export default function ImageSelector({
  images,
  onChangeOrderItemImages,
  onDeleteOrderItemImages,
  index,
}: Props) {
  const [openSnackbar] = useSnackbar();
  const actionData = useActionData() as { isLoading: boolean; index: string };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!actionData?.isLoading && actionData?.index === index) {
      setLoading(false);
    }
  }, [actionData, actionData?.isLoading, index]);

  const onChangeImages = async (event: ChangeEvent<HTMLInputElement>) => {
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
          openSnackbar(error);
        }
      }
      onChangeOrderItemImages(blobs);
    }
  };

  return (
    <FormItem title="Imagenes" data-testid="order-item_images">
      <VariantImageUploader
        labelProps={{
          className:
            "w-full text-center " +
            "bg-white text-neutral-500 " +
            "border border-neutral-300 " +
            "rounded " +
            "py-2 " +
            "hover:bg-neutral-100 " +
            "active:bg-neutral-100 " +
            "focus:bg-neutral-100 " +
            "focus-within:bg-neutral-100 " +
            "cursor-pointer",
        }}
        onFileSelect={onChangeImages}
        isLoading={loading}
      />
      {images &&
        images?.map((image, key) => (
          <FileChip
            key={`${image.name}-${key}`}
            image={image}
            onRemove={() => onDeleteOrderItemImages(key)}
          />
        ))}
    </FormItem>
  );
}
