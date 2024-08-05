import { MouseEvent, useState, ReactNode, Fragment, useMemo } from "react";
import { Props as ElementCardProps } from "components/ElementCard";
import { SliderImage as SliderImageType } from "helpers/customTypes";
import DefaultPic from "assets/default-pic.png";

type Props = {
  images: (SliderImageType & { src?: string })[];
  children?: ReactNode;
  imageClassName?: string;
  type: ElementCardProps["type"];
};
export default function SliderImage({
  images,
  children,
  imageClassName = "",
  type,
}: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const currentImageSrc = useMemo(() => {
    if (images[imageIndex]?.src) {
      return images[imageIndex].src;
    } else if (images[imageIndex]?.name) {
      return `${import.meta.env.VITE_BASE_URL}/${images[imageIndex].name}`;
    }
    return DefaultPic;
  }, [images, imageIndex]);
  const currentImageAlt = useMemo(() => {
    if (images[imageIndex]?.id) {
      return `${type} image ${images[imageIndex].id}`;
    }
    return "default image";
  }, [images, imageIndex, type]);

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
    <Fragment>
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
          aria-label="imagen anterior"
        >
          <i className="fa-solid fa-angle-left" />
        </button>
      )}
      {children && children}
      <div className="w-full flex items-center justify-center">
        <img
          data-testid={`slider-image_${images[imageIndex]?.id || "default"}`}
          className={`${imageClassName} ` + "max-h-64"}
          alt={currentImageAlt}
          src={currentImageSrc}
        />
      </div>
      {images.length > 1 && (
        <button
          onClick={handleNextImage}
          className={
            "absolute right-2 " +
            "text-slate-500 " +
            "h-full w-5 " +
            "hover:text-slate-900 hover:text-lg "
          }
          data-testid="next-image_button"
          aria-label="imagen siguiente"
        >
          <i className="fa-solid fa-angle-right" />
        </button>
      )}
    </Fragment>
  );
}
