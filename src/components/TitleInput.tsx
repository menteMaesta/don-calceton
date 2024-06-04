import { InputHTMLAttributes } from "react";

type Props = {
  "data-testid"?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TitleInput({ className, ...other }: Props) {
  return (
    <input
      className={
        "rounded " +
        "font-bold " +
        "w-full sm:mb-2 " +
        "px-1 " +
        "border-slate-400 border " +
        "dark:border-slate-800 " +
        "dark:bg-slate-800 " +
        "dark:focus-visible:border-slate-400 " +
        "focus-visible:outline-0 " +
        className
      }
      {...other}
    />
  );
}
