import { ReactNode, ButtonHTMLAttributes } from "react";
import classnames from "classnames";

type Props = {
  disabled: boolean;
  children: ReactNode;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function Button({ disabled, children, props }: Props) {
  const { className, ...rest } = props || { className: "" };
  return (
    <button
      disabled={disabled}
      className={classnames(
        "bg-slate-800 text-white font-medium",
        "rounded py-1 px-4 mt-2",
        "disabled:bg-slate-300 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
