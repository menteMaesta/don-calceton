import { Link } from "react-router-dom";
import { es } from "helpers/strings";

type Props = { to: string; "data-testid"?: string };

export default function CancelButton({ to, ...rest }: Props) {
  return (
    <Link
      to={to}
      type="button"
      className={
        "bg-white text-black font-medium " +
        "rounded py-1 px-4 shadow " +
        "disabled:bg-slate-100 disabled:cursor-not-allowed " +
        "disabled:text-slate-300 cursor-pointer " +
        "dark:bg-slate-700 dark:text-slate-200 " +
        "dark:hover:bg-slate-900 dark:active:bg-slate-900 " +
        "dark:focus:bg-slate-900"
      }
      {...rest}
    >
      {es.cancel}
    </Link>
  );
}
