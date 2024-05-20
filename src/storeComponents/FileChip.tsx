import { MouseEvent } from "react";
import { OrderImage } from "helpers/customTypes";
import { KB } from "helpers/constants";

type Props = {
  image: OrderImage;
  onRemove: (event: MouseEvent<HTMLElement>) => void;
};

export default function FileChip({ image, onRemove }: Props) {
  return (
    <div
      className={
        "flex justify-between " +
        "relative py-1 px-2 " +
        "shadow rounded mt-2 items-center " +
        "text-slate-600"
      }
      onClick={(event) => event.preventDefault()}
    >
      <span className="w-7/12 truncate" title={image.name}>
        {image.name}
      </span>
      <span className="pr-5 text-xs">{(image.size / KB).toFixed(2)} KB</span>
      <i
        role="button"
        onClick={onRemove}
        className={
          "absolute right-2 top-2 " +
          "fa-solid fa-circle-xmark " +
          "text-gray-300 " +
          "hover:text-gray-500 active:text-gray-500"
        }
      />
    </div>
  );
}
