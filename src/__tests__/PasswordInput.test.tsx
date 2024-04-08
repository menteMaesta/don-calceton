import { render, fireEvent } from "@testing-library/react";
import PasswordInput from "components/PasswordInput";

describe("PasswordInput", () => {
  test("renders correctly", () => {
    const { getByLabelText, getByTitle } = render(
      <PasswordInput label="Password" />
    );

    const inputElement = getByLabelText("Password") as HTMLInputElement;
    const toggleButton = getByTitle("Mostrar contraseña");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.type).toBe("password");
    expect(inputElement).toHaveClass(
      "rounded-lg border",
      "border-slate-400",
      "py-2 pl-3 pr-8"
    );

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveClass(
      "absolute top-9 right-2",
      "fa-solid",
      "text-slate-500",
      "active:text-slate-700 hover:text-slate-700"
    );
  });

  test("handles input change correctly", () => {
    const { getByLabelText } = render(<PasswordInput label="Password" />);

    const inputElement = getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "test123" } });

    expect(inputElement.value).toBe("test123");
  });

  test("toggles password visibility correctly", () => {
    const { getByLabelText, getByTitle } = render(
      <PasswordInput label="Password" />
    );
    const inputElement = getByLabelText("Password") as HTMLInputElement;
    const toggleButton = getByTitle("Mostrar contraseña");

    fireEvent.click(toggleButton);

    expect(inputElement.type).toBe("text");
    expect(toggleButton).toHaveClass("fa-eye-slash");

    fireEvent.click(toggleButton);

    expect(inputElement.type).toBe("password");
    expect(toggleButton).toHaveClass("fa-eye");
  });
});
