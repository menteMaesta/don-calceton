import { Link } from "react-router-dom";
import classnames from "classnames";
import { Variant } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import DefaultPic from "assets/default-pic.png";

type Props = {
  variant: Variant;
};
export default function VariantCard({ variant }: Props) {
  const imageName = variant.images[0]?.name;
  return (
    <Link
      to={ROUTES.VARIANT.replace(":variantId", `${variant.id}`)}
      className={classnames(
        "flex flex-wrap",
        "rounded py-2 px-4",
        "bg-white shadow",
        "items-center justify-center"
      )}
    >
      <img
        className="max-h-64"
        src={
          imageName
            ? `${import.meta.env.VITE_BASE_URL}/${imageName}`
            : DefaultPic
        }
      />
      <p className="w-3/5 text-lg font-semibold">{variant.name}</p>
      <p className="w-2/5 pt-2 px-2 mb-2 text-right">
        <span className="text-sm">stock: </span>
        {variant.quantity}
      </p>
    </Link>
  );
}
