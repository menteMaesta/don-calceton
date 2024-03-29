import { InputHTMLAttributes } from "react";
import classnames from "classnames";

type props = {
  label: string;
  labelClassName?: string;
  helpText?: string;
  helpTextClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  className,
  labelClassName,
  helpText,
  helpTextClassName,
  ...other
}: props) {
  return (
    <label className={labelClassName}>
      <p>{label}</p>
      <input
        className={classnames(
          "rounded-lg border",
          "border-slate-400",
          "py-2 px-3 w-full",
          className
        )}
        {...other}
      />
      {helpText && (
        <p
          className={classnames(
            "text-red-900",
            "text-sm pl-2",
            helpTextClassName
          )}
        >
          {helpText}
        </p>
      )}
    </label>
  );
}
