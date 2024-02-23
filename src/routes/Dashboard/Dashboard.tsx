import { Outlet, Link } from "react-router-dom";
import classnames from "classnames";
import { ROUTES } from "helpers/constants";

export default function Dashboard() {
  return (
    <div
      className={classnames(
        "w-screen h-screen",
        "bg-slate-50 overflow-x-hidden",
        "flex flex-col",
        "items-center pb-4"
      )}
    >
      <Link
        to={ROUTES.DASHBOARD}
        className={classnames(
          "w-screen h-11",
          "shadow shadow-slate-100 bg-white",
          "flex items-center space-x-2",
          "absolute top-0 z-10"
        )}
      >
        <i
          className={classnames(
            "fa-solid fa-socks",
            "text-xl text-slate-700",
            "mb-4 mt-24"
          )}
        />
        <p className="font-medium text-slate-700">Don Calcetón</p>
      </Link>

      <Outlet />
    </div>
  );
}
