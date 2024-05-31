import { useEffect, MouseEvent, ChangeEvent } from "react";
import classnames from "classnames";
import imageCompression from "browser-image-compression";
import { useLoaderData, useActionData, useSubmit } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { Variant, ErrorType, VariantBase } from "helpers/customTypes";
import DefaultPic from "assets/default-pic.png";
import VariantData from "components/VariantData";
import VariantImageUploader from "components/VariantImageUploader";
import ImageCard from "components/ImageCard";
import EmptyState from "components/EmptyState";
import { es } from "helpers/strings";

export default function VariantDetails() {
  const variant = useLoaderData() as Variant;
  const submit = useSubmit();
  const [openSnackbar] = useSnackbar();
  const actionData = useActionData() as ErrorType;

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  const onEdit = (data: VariantBase) => {
    const formData = new FormData();
    formData.append("variant", "editVariant");
    formData.append("productId", `${variant.productId}`);
    formData.append("variantId", `${variant.id}`);
    formData.append("data", JSON.stringify(data));
    submit(formData, { method: "post" });
  };

  const onRemove = (event: MouseEvent<HTMLElement>, imageId: string) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("variant", "delete");
    formData.append("variantId", `${variant.id}`);
    formData.append("imageId", imageId);
    submit(formData, { method: "post" });
  };

  const onFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const formData = new FormData();
    formData.append("variant", "createImages");
    formData.append("variantId", `${variant.id}`);
    if (files) {
      for (const file of files) {
        try {
          const compressedFile = await imageCompression(file, options);
          formData.append("images[]", compressedFile, file.name);
        } catch (error) {
          openSnackbar(error);
        }
      }
    }
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  return (
    <div className={classnames("w-full mt-14 px-4")} data-testid="variant-page">
      <VariantData variant={variant} onEditData={onEdit} />
      <div className="w-full flex items-center justify-center">
        <VariantImageUploader
          onFileSelect={onFileSelect}
          className="sticky top-12 z-10 mt-4"
          labelProps={{ className: "sticky top-12 z-10 text-white" }}
        />
      </div>
      {variant.images.length > 0 ? (
        <div
          className={classnames(
            "grid grid-cols-1 gap-4",
            "sm:grid-cols-3 w-full",
            "pt-7 px-4"
          )}
          data-testid="image-list"
        >
          {variant.images &&
            variant.images.map((image) => (
              <ImageCard
                key={image.id}
                onRemove={(event) => onRemove(event, `${image.id}`)}
                image={{
                  id: image.id,
                  name: image.name,
                  src: image?.name
                    ? `${import.meta.env.VITE_BASE_URL}/${image?.name}`
                    : DefaultPic,
                }}
                className={classnames("max-h-64", "flex justify-center")}
                imageClassName="object-contain max-h-64"
              />
            ))}
        </div>
      ) : (
        <EmptyState name={es.variants.images} />
      )}
    </div>
  );
}
