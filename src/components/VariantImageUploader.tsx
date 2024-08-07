import { ChangeEvent, LabelHTMLAttributes, InputHTMLAttributes } from "react";
import classnames from "classnames";
import { es } from "helpers/strings";

type props = {
  title?: string;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  labelProps?: LabelHTMLAttributes<HTMLParagraphElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  isLoading?: boolean;
  className?: string;
};

export default function VariantImageUploader({
  title = es.imagesPngJpg,
  onFileSelect,
  labelProps,
  inputProps,
  isLoading,
  className,
}: props) {
  const { className: labelClassName, ...restLabelProps } = labelProps || {};
  const {
    className: inputClassName,
    disabled,
    ...restInputProps
  } = inputProps || {};
  return (
    <label
      data-testid="variant-image-uploader"
      className={classnames("w-fit", className)}
    >
      <p
        className={classnames(
          "bg-slate-700",
          "w-fit p-2",
          "rounded",
          {
            "opacity-50 cursor-not-allowed": isLoading,
            "cursor-pointer": !isLoading,
          },
          labelClassName
        )}
        {...restLabelProps}
      >
        {isLoading && (
          <i className={"fa-solid fa-spinner " + "animate-spin mr-2 "} />
        )}
        <span>{title}</span>
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
        disabled={isLoading ? true : disabled}
        {...restInputProps}
      />
    </label>
  );
}
