import { MouseEvent, useEffect, ChangeEvent } from "react";
import classnames from "classnames";
import { useLoaderData, useActionData, useSubmit } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { Variant, ErrorType, VariantBase } from "helpers/customTypes";
import DefaultPic from "assets/default-pic.png";
import SectionDivider from "components/SectionDivider";
import VariantData from "components/VariantData";
import ImageCard from "src/components/ImageCard";
import VariantImageUploader from "src/components/VariantImageUploader";

export default function VariantDetails() {
  const variant = useLoaderData() as Variant;
  const submit = useSubmit();
  const [openSnackbar] = useSnackbar();
  const actionData = useActionData() as ErrorType;

  const onRemove = (event: MouseEvent<HTMLElement>, imageId: string) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("variant", "delete");
    formData.append("variantId", `${variant.id}`);
    formData.append("imageId", imageId);
    submit(formData, { method: "post" });
  };

  const onEdit = (data: VariantBase) => {
    const formData = new FormData();
    formData.append("variant", "editVariant");
    formData.append("productId", `${variant.productId}`);
    formData.append("variantId", `${variant.id}`);
    formData.append("data", JSON.stringify(data));
    submit(formData, { method: "post" });
  };

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;

    const formData = new FormData();
    formData.append("variant", "createImages");
    formData.append("variantId", `${variant.id}`);
    if (files) {
      for (const file of files) {
        formData.append("images[]", file, file.name);
      }
    }
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div className={classnames("w-full mt-14 px-4")} data-testid="variant-page">
      <VariantData variant={variant} onEditData={onEdit} />

      <section className="relative flex flex-col items-center w-full">
        <SectionDivider section="Imagenes" />
        <VariantImageUploader
          onFileSelect={onFileSelect}
          className="sticky top-12 z-10 mt-4"
          labelProps={{ className: "sticky top-12 z-10" }}
        />
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
      </section>
    </div>
  );
}
