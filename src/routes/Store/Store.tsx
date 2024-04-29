import { Outlet, Link } from "react-router-dom";
import classnames from "classnames";
import { ROUTES } from "helpers/constants";

export default function Store() {
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
        <Link
          to={ROUTES.STORE}
          className={classnames("flex items-center", "space-x-2 pr-2")}
        >
          <i
            className={classnames(
              "fa-solid fa-cart-shopping",
              "text-xl text-slate-700",
              "ml-2"
            )}
          />
          <p className="font-medium text-slate-700">Carrito</p>
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
