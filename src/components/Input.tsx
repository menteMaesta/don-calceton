import { InputHTMLAttributes } from "react";
import classnames from "classnames";

export type props = {
  label: string;
  labelClassName?: string;
  otherElements?: JSX.Element;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  className,
  labelClassName,
  otherElements,
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
      {otherElements && otherElements}
    </label>
  );
}
