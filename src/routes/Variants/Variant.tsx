import classnames from "classnames";
import { useLoaderData } from "react-router-dom";
import { Variant } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import DefaultPic from "assets/default-pic.png";
import SectionDivider from "components/SectionDivider";
import SticyLink from "components/StickyLink";

export default function VariantDetails() {
  const variant = useLoaderData() as Variant;

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
                className="max-h-64 flex justify-center bg-white rounded shadow"
                key={image.id}
              >
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
