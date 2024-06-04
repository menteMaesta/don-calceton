import { ButtonHTMLAttributes } from "react";

type Props = {
  "data-testid"?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SaveButton({ className, ...other }: Props) {
  return (
    <button
      className={
        "absolute right-9 top-2 " +
        "fa-solid fa-check " +
        "text-green-600 text-md " +
        "hover:text-green-700 active:text-green-700 " +
        "disabled:text-slate-300 disabled:cursor-not-allowed " +
        "dark:hover:text-green-400 dark:active:text-green-400 " +
        "dark:disabled:text-slate-500 " +
        className
      }
      {...other}
    />
  );
}
