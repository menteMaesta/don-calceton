import { useState, ChangeEvent, Fragment, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import classnames from "classnames";
import { ErrorType } from "helpers/customTypes";

export default function ForgotPassword() {
  const [data, setData] = useState({ email: "" });
  const [openSnackbar] = useSnackbar();
  const actionData = useActionData() as ErrorType;

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, email: event.target.value }));
  };
  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
  }, [actionData]);

  return (
    <Fragment>
      <i
        className={classnames(
          "fa-solid fa-socks",
          "text-9xl text-slate-700",
          "mb-4 mt-24"
        )}
      />
      <p className="text-2xl font-bold text-slate-600">
        Olvidaste tu contraseña?
      </p>
      <p
        className={classnames(
          "text-sm text-slate-600",
          "w-4/5 sm:w-full",
          "sm:text-center pt-2"
        )}
      >
        Escribe aquí tu correo y enviaremos un mensaje de actualización
      </p>

      <Form className="flex flex-col mt-12 space-y-6" method="post">
        <label>
          <p>correo</p>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeEmail}
            placeholder="calcetas@mail.com"
            className="rounded-lg border-slate-400 border py-2 px-3"
          />
        </label>

        <button
          disabled={!data.email}
          type="submit"
          name="user"
          value="forgot_password"
          className={classnames(
            "bg-slate-800 text-white font-medium",
            "rounded py-1 px-4 mt-2",
            "disabled:bg-slate-300 disabled:cursor-not-allowed"
          )}
        >
          Enviar
        </button>
      </Form>
    </Fragment>
  );
}
