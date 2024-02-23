import { useState, ChangeEvent, MouseEvent } from "react";
import { useSubmit, useParams } from "react-router-dom";
import classnames from "classnames";
import Socks from "assets/socks-solid.svg?react";

export default function ChangePassword() {
  const { forgot_token = "" } = useParams();
  const submit = useSubmit();
  const [data, setData] = useState({
    password: "",
    confirm_password: "",
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSave = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("forgot_token", forgot_token);
    formData.append("new_password", data.password);
    formData.append("user", "change_password");
    submit(formData, { method: "post" });
  };

  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center overflow-hidden">
      <Socks className="w-44 h-44 fill-slate-700 mb-4 mt-24" title="calcetas" />
      <p className="text-3xl font-bold text-slate-600">Cambio de contraseña</p>

      <div className="flex flex-col mt-16 space-y-6">
        <label>
          <p>Nueva contraseña</p>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChange}
            placeholder="tu contraseña"
            className="rounded-lg border-slate-400 border py-2 px-3"
          />
        </label>

        <label>
          <p>Confirma la contraseña</p>
          <input
            type="password"
            name="confirm_password"
            value={data.confirm_password}
            onChange={onChange}
            placeholder="tu contraseña"
            className="rounded-lg border-slate-400 border py-2 px-3"
          />
        </label>

        <button
          disabled={
            !data.password ||
            !data.confirm_password ||
            data.password !== data.confirm_password
          }
          type="submit"
          className={classnames(
            "bg-slate-800 text-white font-medium",
            "rounded py-1 px-4 mt-2",
            "disabled:bg-slate-300 disabled:cursor-not-allowed"
          )}
          onClick={onSave}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
