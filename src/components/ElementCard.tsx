import { MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

type Props = {
  elementId: string;
  title?: string;
  children: ReactNode;
  footer: ReactNode;
  type: "product" | "variant";
  onRemove: (event: MouseEvent<HTMLElement>, productId: string) => void;
  route: string;
};
export default function ElementCard({
  elementId,
  title,
  children,
  footer,
  type,
  onRemove,
  route,
}: Props) {
  return (
    <Link
      to={route}
      className={classnames(
        "flex flex-col",
        "rounded p-2",
        "bg-white shadow",
        "relative"
      )}
      data-testid={`${type}-link_${elementId}`}
    >
      <i
        data-testid={`${type}-remove_${elementId}`}
        role="button"
        onClick={(event) => onRemove(event, `${elementId}`)}
        className={classnames(
          "absolute right-2 top-2",
          "fa-solid fa-circle-xmark",
          "text-gray-300",
          "hover:text-gray-500 active:text-gray-500"
        )}
      />
      {title && (
        <p
          className="w-full font-semibold text-center"
          data-testid={`${type}-name_${elementId}`}
        >
          {title}
        </p>
      )}
      <div className="relative h-64 flex items-center justify-center">
        {children}
      </div>
      {footer}
    </Link>
  );
}
