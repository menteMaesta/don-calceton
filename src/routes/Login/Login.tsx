import { useState, ChangeEvent, Fragment } from "react";
import { Form, Link } from "react-router-dom";
import classnames from "classnames";
import { ROUTES } from "helpers/constants";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, password: event.target.value }));
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, email: event.target.value }));
  };

  return (
    <Fragment>
      <i
        className={classnames(
          "fa-solid fa-socks",
          "text-9xl text-slate-700",
          "mb-4 mt-24"
        )}
      />
      <p className="text-3xl font-bold text-slate-600">Don Calcetón</p>

      <Form className="flex flex-col mt-16 space-y-6" method="post">
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

        <label>
          <p>contraseña</p>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangePassword}
            placeholder="tu contraseña"
            className="rounded-lg border-slate-400 border py-2 px-3"
          />
        </label>
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className={classnames(
            "text-right font-semibold",
            "text-slate-600",
            "hover:text-slate-800 active:text-slate-800"
          )}
        >
          olvidaste tu contraseña?
        </Link>
        <button
          disabled={!data.email || !data.password}
          type="submit"
          name="user"
          value="login"
          className={classnames(
            "bg-slate-800 text-white font-medium",
            "rounded py-1 px-4 mt-2",
            "disabled:bg-slate-300 disabled:cursor-not-allowed"
          )}
        >
          Guardar
        </button>
      </Form>
    </Fragment>
  );
}
