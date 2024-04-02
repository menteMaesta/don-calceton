import { useState, ChangeEvent, MouseEvent, Fragment, useEffect } from "react";
import { useSubmit, useParams, useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import classnames from "classnames";
import Button from "components/Button";
import PasswordInput from "components/PasswordInput";
import { ErrorType } from "helpers/customTypes";

export default function ChangePassword() {
  const { forgot_token = "" } = useParams();
  const submit = useSubmit();
  const actionData = useActionData() as ErrorType;
  const [openSnackbar] = useSnackbar();
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
      <p className="text-3xl font-bold text-slate-600">Cambio de contraseña</p>

      <div className="flex flex-col mt-16 space-y-6">
        <PasswordInput
          label="Nueva contraseña"
          name="password"
          value={data.password}
          onChange={onChange}
          placeholder="tu contraseña"
        />

        <PasswordInput
          label="Confirma la contraseña"
          name="confirm_password"
          value={data.confirm_password}
          onChange={onChange}
          placeholder="tu contraseña"
        />

        <Button
          disabled={
            !data.password ||
            !data.confirm_password ||
            data.password !== data.confirm_password
          }
          type="submit"
          onClick={onSave}
        >
          Guardar
        </Button>
      </div>
    </Fragment>
  );
}
