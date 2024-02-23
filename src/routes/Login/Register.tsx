import { useState, ChangeEvent, Fragment } from "react";
import { Form } from "react-router-dom";
import classnames from "classnames";
import { RegisterData } from "helpers/customTypes";

export default function Register() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    admin: false,
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(
      (prev) =>
        ({ ...prev, [event.target.name]: event.target.value } as RegisterData)
    );
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
      <p className="text-3xl font-bold text-slate-600">Registro</p>

      <Form className="flex flex-col mt-16 space-y-6" method="post">
        <label>
          <p>Nombre</p>
          <input
            name="fullName"
            value={data.fullName}
            onChange={onChange}
            placeholder="Jose Perez"
            className="rounded-lg border-slate-400 border py-2 px-3"
          />
        </label>

        <label>
          <p>correo</p>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
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
            onChange={onChange}
            placeholder="tu contraseña"
            className="rounded-lg border-slate-400 border py-2 px-3"
          />
        </label>

        <button
          disabled={!data.fullName || !data.email || !data.password}
          type="submit"
          name="user"
          value="register"
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
