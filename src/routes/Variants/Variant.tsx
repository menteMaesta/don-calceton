import { MouseEvent, useEffect, ChangeEvent } from "react";
import classnames from "classnames";
import { useLoaderData, useActionData, useSubmit } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { Variant, ErrorType, VariantBase } from "helpers/customTypes";
import DefaultPic from "assets/default-pic.png";
import SectionDivider from "components/SectionDivider";
import VariantData from "components/VariantData";
import ImageCard from "src/components/ImageCard";

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
  }, [actionData, openSnackbar]);

  return (
    <div className={classnames("w-full mt-14 px-4")} data-testid="variant-page">
      <VariantData variant={variant} onEditData={onEdit} />

      <section className="relative flex flex-col items-center w-full">
        <SectionDivider section="Imagenes" />
        <label className={classnames("w-fit sticky top-12 z-10 mt-4")}>
          <p className="bg-slate-700 w-fit p-2 text-white rounded cursor-pointer sticky top-12 z-10">
            Imagenes (PNG, JPG)
          </p>
          <input
            className="opacity-0 w-0 h-0 absolute -top-1"
            type="file"
            name="images"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={onFileSelect}
          />
        </label>
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
                onRemove={(event) => onRemove(event, `${image.id}`)}
                image={{
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
