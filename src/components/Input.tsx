import { InputHTMLAttributes } from "react";

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
    <label className={"dark:text-slate-200 " + labelClassName}>
      <p>{label}</p>
      <input
        className={
          "rounded-lg border " +
          "border-slate-400 " +
          "py-2 px-3 w-full " +
          "dark:bg-slate-900 dark:border-slate-900 " +
          "dark:placeholder:text-slate-500 " +
          className
        }
        {...other}
      />
      {otherElements && otherElements}
    </label>
  );
}
