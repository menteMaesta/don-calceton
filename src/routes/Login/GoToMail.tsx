import { Fragment } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { ROUTES } from "helpers/constants";

export default function GotoMail() {
  return (
    <Fragment>
      <i
        className={classnames(
          "fa-solid fa-envelope-circle-check",
          "text-9xl text-slate-700",
          "mb-4 mt-24 ml-12"
        )}
      />
      <p
        className="text-2xl font-bold text-slate-600"
        data-testid="to-mail_title"
      >
        Listo!
      </p>
      <p
        className={classnames(
          "text-sm text-slate-600",
          "w-4/5 sm:w-full",
          "text-center pt-2"
        )}
        data-testid="to-mail_description"
      >
        En tu bandeja de correo te dejamos las instrucciones para restablecer tu
        contraseña
      </p>
      <Link
        to={ROUTES.LOGIN}
        className={classnames(
          "bg-slate-800 text-white font-medium",
          "rounded py-1 px-4 mt-12",
          "disabled:bg-slate-300 disabled:cursor-not-allowed"
        )}
        data-testid="to-mail_link"
      >
        Ir al inicio
      </Link>
    </Fragment>
  );
}
