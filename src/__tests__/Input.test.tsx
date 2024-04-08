import { render, screen, fireEvent } from "@testing-library/react";
import Input from "components/Input";

describe("Input", () => {
  test("renders input element with label", () => {
    const label = "Username";
    render(<Input label={label} />);

    const inputElement = screen.getByLabelText(label);
    expect(inputElement).toBeInTheDocument();
  });

  test("applies custom class names", () => {
    const label = "Email";
    const className = "custom-input";
    const labelClassName = "custom-label";

    const { getByLabelText, getByText } = render(
      <Input
        label={label}
        className={className}
        labelClassName={labelClassName}
      />
    );

    const inputElement = getByLabelText(label);
    const labelElement = getByText(label);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(className);
    expect(inputElement).toBeInTheDocument();
    expect(labelElement.parentElement).toHaveClass(labelClassName);
  });

  test("calls onChange when input value changes", () => {
    const onChange = vi.fn();
    const label = "Email";

    const { getByLabelText } = render(
      <Input label={label} name="email" onChange={onChange} />
    );

    const inputElement = getByLabelText(label);

    fireEvent.change(inputElement, {
      target: { name: "email", value: "New Product" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: "email",
          value: "New Product",
        }),
      })
    );
  });
});
