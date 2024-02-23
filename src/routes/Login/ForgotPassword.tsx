import { useState, ChangeEvent } from "react";
import { Form } from "react-router-dom";
import classnames from "classnames";
import Socks from "assets/socks-solid.svg?react";

export default function ForgotPassword() {
  const [data, setData] = useState({ email: "" });

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, email: event.target.value }));
  };

  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center overflow-hidden">
      <Socks className="w-44 h-44 fill-slate-700 mb-4 mt-24" title="calcetas" />
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
    </div>
  );
}
