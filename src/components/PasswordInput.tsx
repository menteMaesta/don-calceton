import { useState, MouseEvent, Fragment } from "react";
import classnames from "classnames";
import Input, { props as InputProps } from "components/Input";
import { es } from "helpers/strings";

export default function PasswordInput({
  className,
  labelClassName,
  type,
  otherElements,
  ...inputProps
}: InputProps) {
  const [show, setShow] = useState(false);

  const handleShow = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShow((prev) => !prev);
  };

  return (
    <Input
      labelClassName={classnames(labelClassName, "relative")}
      className={classnames(className, "pl-3 pr-8")}
      type={show ? "text" : "password"}
      {...inputProps}
      otherElements={
        <Fragment>
          <button
            type="button"
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
            title={show ? es.login.hidePassword : es.login.showPassword}
            onClick={handleShow}
          />
          {otherElements && otherElements}
        </Fragment>
      }
    />
  );
}
