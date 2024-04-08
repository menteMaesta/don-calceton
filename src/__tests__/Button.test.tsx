import { render, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

describe("Button", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<Button>Hello</Button>);
    expect(getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const onClick = vi.fn();
    const { getByText } = render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(getByText("Click me"));
    expect(onClick).toHaveBeenCalled();
  });

  it("applies disabled attribute when disabled prop is true", () => {
    const { getByText } = render(<Button disabled>Disabled Button</Button>);
    const button = getByText("Disabled Button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});
