import {
  Outlet,
  Link,
  NavLink,
  useLoaderData,
  useMatch,
} from "react-router-dom";
import { ROUTES } from "helpers/constants";
import { es } from "helpers/strings";
import { VariantListItem } from "helpers/customTypes";
import BackButton from "src/components/BackButton";

export default function Store() {
  const { totalItems } = useLoaderData() as {
    cart: VariantListItem[];
    totalItems: number;
  };
  const isStore = useMatch(ROUTES.STORE);

  return (
    <div
      className={
        "w-screen h-screen " +
        "bg-slate-50 overflow-x-hidden " +
        "flex flex-col " +
        "items-center pb-4 " +
        "dark:bg-slate-800 "
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
        {isStore && (
          <Link to={ROUTES.STORE} className={"flex items-center space-x-2"}>
            <i
              className={
                "fa-solid fa-socks " +
                "text-xl text-slate-700 " +
                "ml-2 dark:text-slate-300 "
              }
            />
            <p className="font-medium text-slate-700 dark:text-slate-200">
              {es.store} {es.donCalceton}
            </p>
          </Link>
        )}
        {!isStore && <BackButton />}
        <NavLink
          to={ROUTES.CART}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              "text-slate-700",
              "border-b-2 border-slate-700/0",
              isPending ? "text-slate-200" : "",
              isActive ? "border-slate-700/100 dark:border-slate-400/100" : "",
              isTransitioning ? "text-slate-200" : "",
              "flex items-center self-end pb-1",
              "space-x-2 pr-4 relative",
              "dark:hover:border-slate-600/100",
            ].join(" ")
          }
        >
          <i
            className={
              "fa-solid fa-cart-shopping " +
              "text-xl " +
              "ml-2 dark:text-slate-300"
            }
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
          <p className="font-medium dark:text-slate-200">{es.cart}</p>
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
