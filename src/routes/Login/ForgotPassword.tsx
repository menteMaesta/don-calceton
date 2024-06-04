import { useState, ChangeEvent, Fragment, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import Button from "components/Button";
import Input from "components/Input";
import { ErrorType } from "helpers/customTypes";
import { es } from "helpers/strings";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <Fragment>
      <i
        data-testid="forgot-password-component"
        className={
          "fa-solid fa-socks " +
          "text-9xl text-slate-700 " +
          "mb-4 mt-24 " +
          "dark:text-slate-300"
        }
      />
      <p
        className="text-2xl font-bold text-slate-600 dark:text-slate-200"
        data-testid="forgot-password_title"
      >
        {es.changePassword.forgotPassword}
      </p>
      <p
        className={
          "text-sm text-slate-600 " +
          "w-4/5 sm:w-full " +
          "sm:text-center pt-2 " +
          "dark:text-slate-200"
        }
        data-testid="forgot-password_description"
      >
        {es.changePassword.writeEmail}
      </p>

      <Form className="flex flex-col mt-12 space-y-6" method="post">
        <Input
          label={es.login.email}
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeEmail}
          placeholder={es.login.emailPlaceholder}
        />

        <Button
          disabled={!data.email}
          type="submit"
          name="user"
          value="forgot_password"
          data-testid="forgot-password_submit"
        >
          {es.send}
        </Button>
      </Form>
    </Fragment>
  );
}
