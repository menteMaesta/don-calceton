import { useState, InputHTMLAttributes, MouseEvent } from "react";
import classnames from "classnames";

type props = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput({ label, className, ...other }: props) {
  const [show, setShow] = useState(false);

  const handleShow = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShow((prev) => !prev);
  };

  return (
    <label className="relative">
      <p>{label}</p>
      <input
        type={show ? "text" : "password"}
        className={classnames(
          "rounded-lg border",
          "border-slate-400",
          "py-2 pl-3 pr-8",
          className
        )}
        {...other}
      />
      <button
        className={classnames(
          "absolute top-9 right-2",
          "fa-solid",
          "text-slate-500",
          "active:text-slate-700 hover:text-slate-700",
          {
            "fa-eye": !show,
            "fa-eye-slash": show,
          }
        )}
        title={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        onClick={handleShow}
      />
    </label>
  );
}
