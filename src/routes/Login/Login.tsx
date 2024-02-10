import { Form } from "react-router-dom";
import Socks from "assets/socks-solid.svg?react";

export default function Login() {
  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center overflow-hidden">
      <Socks className="w-44 h-44 fill-slate-700 mb-4 mt-40" title="calcetas" />
      <p className="text-3xl font-bold text-slate-600">Don Calcetón</p>

      <Form className="flex flex-col mt-16 space-y-6" method="post">
        <label>
          <p>correo</p>
          <input
            type="email"
            name="email"
            placeholder="calcetas@mail.com"
            className="rounded-lg border-slate-400 border py-2 px-3"
          />
        </label>

        <label>
          <p>contraseña</p>
          <input
            type="password"
            name="password"
            placeholder="tu contraseña"
            className="rounded-lg border-slate-400 border py-2 px-3"
          />
        </label>
        <input
          type="submit"
          value="Submit"
          className="bg-slate-800 rounded py-1 px-4 mt-2 text-white font-medium"
        />
      </Form>
    </div>
  );
}
