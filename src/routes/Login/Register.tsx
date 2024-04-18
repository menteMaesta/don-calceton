import { useState, ChangeEvent, Fragment, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import classnames from "classnames";
import Button from "components/Button";
import PasswordInput from "components/PasswordInput";
import Input from "components/Input";
import { RegisterData, ErrorType } from "helpers/customTypes";

export default function Register() {
  const [openSnackbar] = useSnackbar();
  const actionData = useActionData() as ErrorType;
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

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <p className="text-3xl font-bold text-slate-600">Registro</p>

      <Form className="flex flex-col mt-16 space-y-6" method="post">
        <Input
          label="Nombre"
          name="fullName"
          value={data.fullName}
          onChange={onChange}
          placeholder="Jose Perez"
        />

        <Input
          label="Correo"
          type="email"
          name="email"
          value={data.email}
          onChange={onChange}
          placeholder="calcetas@mail.com"
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          value={data.password}
          onChange={onChange}
          placeholder="tu contraseña"
        />

        <Button
          disabled={!data.fullName || !data.email || !data.password}
          type="submit"
          name="user"
          value="register"
        >
          Guardar
        </Button>
      </Form>
    </Fragment>
  );
}
