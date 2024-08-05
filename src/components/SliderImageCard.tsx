import { ReactNode } from "react";
import ElementCard, { Props as ElementCardProps } from "components/ElementCard";
import { SliderImage as SliderImageType } from "helpers/customTypes";
import SliderImage from "components/SliderImage";

type Props = {
  images: (SliderImageType & { src?: string })[];
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
  return (
    <ElementCard type={type} {...otherProps}>
      <SliderImage
        images={images}
        children={children}
        imageClassName={imageClassName}
        type={type}
      />
    </ElementCard>
  );
}
