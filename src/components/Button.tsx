import { ReactNode, ButtonHTMLAttributes } from "react";
import classnames from "classnames";

type Props = {
  disabled?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ disabled, children, ...props }: Props) {
  const { className = "", ...rest } = props || { className: "" };
  return (
    <button
      disabled={disabled}
      className={classnames(
        "rounded py-1 px-4",
        "active:bg-slate-800",
        {
          "bg-slate-800": !className.includes("bg"),
          "text-white": !className.includes("text"),
          "font-medium": !className.includes("font-"),
        },
        "disabled:bg-slate-300 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
