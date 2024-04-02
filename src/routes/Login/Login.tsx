import { useState, ChangeEvent, Fragment, useEffect } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import classnames from "classnames";
import Button from "components/Button";
import PasswordInput from "components/PasswordInput";
import Input from "components/Input";
import { ROUTES } from "helpers/constants";
import { ErrorType } from "helpers/customTypes";

export default function Login() {
  const actionData = useActionData() as ErrorType;
  const [openSnackbar] = useSnackbar();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, password: event.target.value }));
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, email: event.target.value }));
  };

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
  }, [actionData, openSnackbar]);

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
        <Input
          label="Correo"
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeEmail}
          placeholder="calcetas@mail.com"
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          value={data.password}
          onChange={onChangePassword}
          placeholder="tu contraseña"
        />

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
        <Button
          disabled={!data.email || !data.password}
          type="submit"
          name="user"
          value="login"
        >
          Guardar
        </Button>
      </Form>
    </Fragment>
  );
}
