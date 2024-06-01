import { MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";

type ElementCardWrapperProps = {
  route?: string;
  className?: string;
  "data-testid"?: string;
  children: ReactNode;
};
export type Props = {
  elementId: string;
  title?: string;
  children: ReactNode;
  footer: ReactNode;
  type: "product" | "variant";
  onRemove?: (event: MouseEvent<HTMLElement>, productId: string) => void;
  route?: string;
  className?: string;
};

function ElementCardWrapper({ route, ...props }: ElementCardWrapperProps) {
  if (route) {
    return <Link to={route} {...props} />;
  } else {
    return <div {...props} />;
  }
}

export default function ElementCard({
  elementId,
  title,
  children,
  footer,
  type,
  onRemove,
  route,
  className = "",
}: Props) {
  return (
    <ElementCardWrapper
      route={route}
      className={
        "flex flex-col " +
        "rounded p-2 " +
        "bg-white shadow " +
        "relative " +
        "dark:bg-slate-700 dark:shadow-slate-900 " +
        "dark:text-slate-300 " +
        className
      }
      data-testid={`${type}-link_${elementId}`}
    >
      {onRemove && (
        <i
          data-testid={`${type}-remove_${elementId}`}
          role="button"
          onClick={(event) => onRemove(event, `${elementId}`)}
          className={
            "absolute right-2 top-2 " +
            "fa-solid fa-circle-xmark " +
            "text-gray-300 z-[1] " +
            "hover:text-gray-500 active:text-gray-500"
          }
        />
      )}
      {title && (
        <p
          className="w-full font-semibold text-center dark:text-slate-100"
          data-testid={`${type}-name_${elementId}`}
        >
          {title}
        </p>
      )}
      <div
        className={"relative h-64 " + "flex items-center " + "justify-center "}
      >
        {children}
      </div>
      {footer}
    </ElementCardWrapper>
  );
}
