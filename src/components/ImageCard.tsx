import { MouseEvent } from "react";
import classnames from "classnames";
import DeleteButton from "components/DeleteButton";

type Props = {
  onRemove: (event: MouseEvent<HTMLElement>) => void;
  image: { id?: number; name: string; src: string };
  showName?: boolean;
  className?: string;
  imageContainerClassName?: string;
  imageClassName?: string;
};

export default function ImageCard({
  onRemove,
  image,
  showName = false,
  className,
  imageContainerClassName,
  imageClassName,
}: Props) {
  return (
    <div
      className={classnames(
        "flex flex-col",
        "items-center bg-white",
        "shadow rounded relative",
        className
      )}
      data-testid={`image-card_${image.id || image.src}`}
    >
      <DeleteButton
        data-testid={`remove-button_${image.src}`}
        title="eliminar"
        onClick={(event) => onRemove(event)}
      />
      <div className={imageContainerClassName}>
        <img className={imageClassName} src={image.src} alt={image.name} />
      </div>
      {showName && <p>{image.name}</p>}
    </div>
  );
}
