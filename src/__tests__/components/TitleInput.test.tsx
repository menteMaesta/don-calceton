import { act } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TitleInput from "components/TitleInput";

describe("TitleInput", () => {
  const dataTestId = "title-input";
  test("renders without errors", () => {
    const { getByTestId } = render(<TitleInput data-testid={dataTestId} />);
    const inputElement = getByTestId(dataTestId);
    expect(inputElement).toBeInTheDocument();
  });

  test("passes className prop to the input element", () => {
    const className = "custom-class";
    const { getByTestId } = render(
      <TitleInput className={className} data-testid={dataTestId} />
    );
    const inputElement = getByTestId(dataTestId);
    expect(inputElement).toHaveClass(className);
  });

  test("renders correct base classes", () => {
    const { getByTestId } = render(<TitleInput data-testid={dataTestId} />);
    const darkClasses = [
      "dark:border-slate-800",
      "dark:bg-slate-800",
      "dark:focus-visible:border-slate-400",
    ];
    const baseClasses = [
      "rounded " + "font-bold",
      "w-full",
      "sm:mb-2",
      "px-1",
      "border-slate-400",
      "border",
      "focus-visible:outline-0",
    ];
    const inputElement = getByTestId(dataTestId);
    expect(inputElement).toHaveClass(
      [...baseClasses, ...darkClasses].join(" ")
    );
  });

  test("updates input value when user types", async () => {
    const { getByTestId } = render(<TitleInput data-testid={dataTestId} />);
    const inputElement = getByTestId(dataTestId);
    const inputValue = "New Title";
    await act(() => userEvent.type(inputElement, inputValue));
    expect(inputElement).toHaveValue(inputValue);
  });
});
