import { MouseEvent, useState, ReactNode } from "react";
import ElementCard, { Props as ElementCardProps } from "components/ElementCard";
import { SliderImage } from "helpers/customTypes";
import DefaultPic from "assets/default-pic.png";

type Props = {
  images: SliderImage[];
  children?: ReactNode;
  imageClassName?: string;
} & Omit<ElementCardProps, "children">;
export default function SliderImageCard({
  images,
  children,
  type,
  imageClassName = "",
  ...otherProps
}: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const handleNextImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setImageIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  };

  const handlePrevImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setImageIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  };

  return (
    <ElementCard type={type} {...otherProps}>
      {images.length > 1 && (
        <button
          onClick={handlePrevImage}
          className={
            "absolute left-2 " +
            "text-slate-500 " +
            "h-full w-5 " +
            "hover:text-slate-900 hover:text-lg"
          }
          data-testid="prev-image_button"
        >
          <i className="fa-solid fa-angle-left" />
        </button>
      )}
      {children && children}
      <div className="w-full flex items-center justify-center">
        <img
          data-testid={`slider-image_${images[imageIndex]?.id || "default"}`}
          className={`${imageClassName} ` + "max-h-64"}
          alt={
            images[imageIndex]?.id
              ? `${type} image ${images[imageIndex].id}`
              : "default image"
          }
          src={
            images[imageIndex]?.name
              ? `${import.meta.env.VITE_BASE_URL}/${images[imageIndex]?.name}`
              : DefaultPic
          }
        />
      </div>
      {images.length > 1 && (
        <button
          onClick={handleNextImage}
          className={
            "absolute right-2 " +
            "text-slate-500 " +
            "h-full w-5 " +
            "hover:text-slate-900 hover:text-lg"
          }
          data-testid="next-image_button"
        >
          <i className="fa-solid fa-angle-right" />
        </button>
      )}
    </ElementCard>
  );
}
