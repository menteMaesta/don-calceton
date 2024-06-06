import { render, screen, fireEvent } from "@testing-library/react";
import SaveButton from "components/SaveButton";

describe("SaveButton", () => {
  test("renders SaveButton component", () => {
    render(<SaveButton />);
    const saveButton = screen.getByRole("button");
    expect(saveButton).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const onClickMock = vi.fn();
    render(<SaveButton onClick={onClickMock} />);
    const saveButton = screen.getByRole("button");
    fireEvent.click(saveButton);
    expect(onClickMock).toHaveBeenCalled();
  });

  test("renders with custom className", () => {
    render(<SaveButton className="custom-class" />);
    const saveButton = screen.getByRole("button");
    expect(saveButton).toHaveClass("custom-class");
  });

  test("renders with custom data-testid", () => {
    render(<SaveButton data-testid="save-button" />);
    const saveButton = screen.getByTestId("save-button");
    expect(saveButton).toBeInTheDocument();
  });
});
