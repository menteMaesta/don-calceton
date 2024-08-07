import { Outlet, Link } from "react-router-dom";
import { ROUTES } from "helpers/constants";
import { es } from "helpers/strings";

export default function Dashboard() {
  return (
    <div
      className={
        "w-screen h-screen " +
        "bg-slate-50 overflow-x-hidden " +
        "flex flex-col " +
        "items-center pb-4 " +
        "dark:bg-slate-800"
      }
    >
      <div
        className={
          "w-screen h-11 justify-between " +
          "shadow shadow-slate-100 bg-white " +
          "flex items-center space-x-2 " +
          "absolute top-0 z-10 " +
          "dark:bg-slate-900 " +
          "dark:shadow-slate-950"
        }
      >
        <div className="flex space-x-2">
          <Link to={ROUTES.DASHBOARD} className={"flex items-center space-x-1"}>
            <i
              className={
                "fa-solid fa-socks " +
                "text-xl text-slate-700 " +
                "ml-3 dark:text-slate-300 "
              }
            />
            <p className="font-medium text-slate-700 dark:text-slate-200">
              {es.donCalceton}
            </p>
          </Link>
          <Link
            to={`${ROUTES.DASHBOARD}${ROUTES.ORDERS}`}
            className={"border-l border-slate-300 pl-2"}
          >
            <p className="font-medium text-slate-700 dark:text-slate-200">
              {es.orders.name}
            </p>
          </Link>
        </div>

        <Link
          to={ROUTES.STORE}
          className={"flex items-center " + "space-x-2 pr-2 "}
        >
          <i
            className={
              "fa-solid fa-store " +
              "text-xl text-slate-700 " +
              "ml-2 dark:text-slate-300"
            }
          />
          <p className="font-medium text-slate-700 dark:text-slate-200">
            {es.store}
          </p>
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
