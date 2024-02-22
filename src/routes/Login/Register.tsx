import { useState, ChangeEvent } from "react";
import { Form } from "react-router-dom";
import classnames from "classnames";
import Socks from "assets/socks-solid.svg?react";
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
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center overflow-hidden">
      <Socks className="w-44 h-44 fill-slate-700 mb-4 mt-24" title="calcetas" />
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
    </div>
  );
}
