import { MouseEvent, ButtonHTMLAttributes } from "react";

type Props = {
  onEdit: (event: MouseEvent<HTMLElement>) => void;
  "data-testid"?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function VariantData({ onEdit, className, ...other }: Props) {
  return (
    <button
      onClick={onEdit}
      className={
        "absolute right-9 top-2 " +
        "fa-solid fa-pen " +
        "text-slate-300 " +
        "hover:text-slate-500 active:slate-slate-500 " +
        "dark:hover:text-slate-100 " +
        className
      }
      {...other}
    />
  );
}
