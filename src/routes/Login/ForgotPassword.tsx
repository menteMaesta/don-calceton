import { useState, ChangeEvent, Fragment, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import classnames from "classnames";
import Button from "components/Button";
import Input from "components/Input";
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
        <Input
          label="Correo"
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeEmail}
          placeholder="calcetas@mail.com"
        />

        <Button
          disabled={!data.email}
          type="submit"
          name="user"
          value="forgot_password"
        >
          Enviar
        </Button>
      </Form>
    </Fragment>
  );
}
