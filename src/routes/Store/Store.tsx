import { Outlet, Link, NavLink, useLoaderData } from "react-router-dom";
import classnames from "classnames";
import { ROUTES } from "helpers/constants";
import { VariantListItem } from "helpers/customTypes";

export default function Store() {
  const { totalItems } = useLoaderData() as {
    cart: VariantListItem[];
    totalItems: number;
  };

  return (
    <div
      className={classnames(
        "w-screen h-screen",
        "bg-slate-50 overflow-x-hidden",
        "flex flex-col",
        "items-center pb-4"
      )}
    >
      <div
        className={classnames(
          "w-screen h-11 justify-between",
          "shadow shadow-slate-100 bg-white",
          "flex items-center space-x-2",
          "absolute top-0 z-10"
        )}
      >
        <Link
          to={ROUTES.STORE}
          className={classnames("flex items-center space-x-2")}
        >
          <i
            className={classnames(
              "fa-solid fa-socks",
              "text-xl text-slate-700",
              "ml-2"
            )}
          />
          <p className="font-medium text-slate-700">Tienda Don Calcetón</p>
        </Link>
        <NavLink
          to={ROUTES.CART}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              "text-slate-700",
              "border-b-2 border-slate-700/0",
              isPending ? "text-slate-200" : "",
              isActive ? "border-slate-700/100" : "",
              isTransitioning ? "text-slate-200" : "",
              "flex items-center self-end pb-1",
              "space-x-2 pr-2 relative",
            ].join(" ")
          }
        >
          <i
            className={classnames(
              "fa-solid fa-cart-shopping",
              "text-xl",
              "ml-2"
            )}
          />
          {totalItems > 0 && (
            <span
              className={
                "absolute -top-2 -left-2 " +
                "bg-red-500 text-white " +
                "text-xs rounded-full " +
                "px-1 leading-4"
              }
              data-testid="cart-total_badge"
            >
              {totalItems}
            </span>
          )}
          <p className="font-medium">Carrito</p>
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
