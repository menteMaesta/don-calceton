import { ButtonHTMLAttributes } from "react";

type Props = {
  "data-testid"?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function EditButton({ className, ...other }: Props) {
  return (
    <button
      className={
        "absolute right-9 top-2 " +
        "fa-solid fa-pen " +
        "text-slate-300 " +
        "hover:text-slate-500 active:text-slate-500 " +
        "dark:hover:text-slate-100 " +
        className
      }
      {...other}
    />
  );
}
