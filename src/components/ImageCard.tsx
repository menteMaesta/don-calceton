import { MouseEvent } from "react";
import classnames from "classnames";

type Props = {
  onRemove: (event: MouseEvent<HTMLElement>) => void;
  image: { name: string; src: string };
};

export default function ImageCard({ onRemove, image }: Props) {
  return (
    <div
      className={classnames(
        "flex flex-col",
        "items-center p-4 bg-white",
        "shadow rounded relative"
      )}
    >
      <i
        data-testid={`remove-button_${image.src}`}
        role="button"
        onClick={(event) => onRemove(event)}
        className={classnames(
          "absolute right-2 top-2",
          "fa-solid fa-circle-xmark",
          "text-gray-300",
          "hover:text-gray-500 active:text-gray-500"
        )}
      />
      <div className="h-36 flex items-center justify-center">
        <img className="max-h-36" src={image.src} alt={image.name} />
      </div>
      <p>{image.name}</p>
    </div>
  );
}
