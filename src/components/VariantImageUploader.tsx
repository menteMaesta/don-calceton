import { ChangeEvent } from "react";
import { LabelHTMLAttributes, InputHTMLAttributes } from "react";
import classnames from "classnames";

type props = {
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  labelProps?: LabelHTMLAttributes<HTMLParagraphElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  className?: string;
};

export default function VariantImageUploader({
  onFileSelect,
  labelProps,
  inputProps,
  className,
}: props) {
  const { className: labelClassName, ...restLabelProps } = labelProps || {};
  const { className: inputClassName, ...restInputProps } = inputProps || {};
  return (
    <label
      data-testid="variant-image-uploader"
      className={classnames("w-fit", className)}
    >
      <p
        className={classnames(
          "bg-slate-700 text-white",
          "w-fit p-2",
          "rounded cursor-pointer",
          labelClassName
        )}
        {...restLabelProps}
      >
        Imagenes (PNG, JPG)
      </p>
      <input
        className={classnames(
          "opacity-0",
          "w-0 h-0",
          "absolute -top-1",
          inputClassName
        )}
        type="file"
        name="images"
        accept=".jpg, .jpeg, .png"
        multiple
        onChange={onFileSelect}
        {...restInputProps}
      />
    </label>
  );
}
