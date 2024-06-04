import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "helpers/constants";
import { es } from "helpers/strings";

export default function GotoMail() {
  return (
    <Fragment>
      <i
        className={
          "fa-solid fa-envelope-circle-check " +
          "text-9xl text-slate-700 " +
          "mb-4 mt-24 ml-12 " +
          "dark:text-slate-300"
        }
      />
      <p
        className="text-2xl font-bold text-slate-600 dark:text-slate-200"
        data-testid="to-mail_title"
      >
        {es.goToMail.title}
      </p>
      <p
        className={
          "text-sm text-slate-600 " +
          "w-4/5 sm:w-full " +
          "text-center pt-2 " +
          "dark:text-slate-200"
        }
        data-testid="to-mail_description"
      >
        {es.goToMail.description}
      </p>
      <Link
        to={ROUTES.LOGIN}
        className={
          "bg-slate-800 text-white " +
          "font-medium " +
          "rounded py-1 px-4 mt-12 " +
          "disabled:bg-slate-300 " +
          "disabled:cursor-not-allowed " +
          "dark:text-slate-400 dark:hover:text-slate-200 " +
          "dark:active:text-slate-200"
        }
        data-testid="to-mail_link"
      >
        {es.goToMail.toBegining}
      </Link>
    </Fragment>
  );
}
