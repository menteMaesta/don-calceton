import { MouseEvent, useEffect } from "react";
import classnames from "classnames";
import { useLoaderData, useActionData, useSubmit } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { Variant, ErrorType } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import DefaultPic from "assets/default-pic.png";
import SectionDivider from "components/SectionDivider";
import SticyLink from "components/StickyLink";

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

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
  }, [actionData]);

  return (
    <div className={classnames("w-full mt-14 px-4")}>
      <main className="flex flex-wrap items-center justify-between bg-white px-4 py-2 rounded-md shadow">
        <p className="text-2xl w-full font-bold">{variant.name}</p>
        <p>stock: {variant.quantity}</p>
      </main>

      <section className="relative flex flex-col items-center w-full">
        <SectionDivider section="Imagenes" />
        <SticyLink
          to={ROUTES.NEW_VARIANT.replace(":productId", `${variant.id}`)}
          title="Subir imagenes"
        />
        <div
          className={classnames(
            "grid grid-cols-1 gap-4",
            "sm:grid-cols-3 w-full",
            "pt-7 px-4"
          )}
        >
          {variant.images &&
            variant.images.map((image) => (
              <div
                className={classnames(
                  "max-h-64 bg-white",
                  "flex justify-center",
                  "rounded shadow",
                  "relative"
                )}
                key={image.id}
              >
                <i
                  role="button"
                  onClick={(event) => onRemove(event, `${image.id}`)}
                  className={classnames(
                    "absolute right-2 top-2",
                    "fa-solid fa-circle-xmark",
                    "text-gray-300",
                    "hover:text-gray-500 active:text-gray-500"
                  )}
                />
                <img
                  className="object-contain max-h-64"
                  src={
                    image?.name
                      ? `${import.meta.env.VITE_BASE_URL}/${image?.name}`
                      : DefaultPic
                  }
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
