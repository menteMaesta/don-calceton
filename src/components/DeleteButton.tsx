import { MouseEvent, ButtonHTMLAttributes } from "react";

type Props = {
  onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
  "data-testid"?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function DeleteButton({ onRemove, className, ...other }: Props) {
  return (
    <button
      onClick={onRemove}
      className={
        "absolute right-2 top-2 " +
        "fa-solid fa-circle-xmark " +
        "text-slate-300 z-[1] " +
        "hover:text-slate-500 active:text-slate-500 " +
        "dark:hover:text-slate-100" +
        className
      }
      {...other}
    />
  );
}
