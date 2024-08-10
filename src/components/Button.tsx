import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import classnames from "classnames";

type Ref = HTMLButtonElement;

type Props = {
  disabled?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default forwardRef<Ref, Props>(function Button(
  { disabled, children, ...props },
  ref
) {
  const { className = "", ...rest } = props || { className: "" };
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={classnames(
        "rounded py-1 px-4",
        {
          "bg-slate-700": !className.includes("bg"),
          "active:bg-slate-800 focus:bg-slate-800": !className.includes("bg"),
          "text-white": !className.includes("text"),
          "font-medium": !className.includes("font-"),
        },
        "dark:bg-slate-700 dark:text-white",
        "dark:hover:bg-slate-900 dark:text-slate-200",
        "disabled:bg-slate-300 disabled:cursor-not-allowed",
        "dark:disabled:bg-slate-700 dark:disabled:text-slate-600",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
