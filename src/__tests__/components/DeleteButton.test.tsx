import { render, fireEvent } from "@testing-library/react";
import DeleteButton from "components/DeleteButton";

describe("DeleteButton", () => {
  const testId = "delete-button";
  it("should render the button with the provided className", () => {
    const className = "delete-button";
    const { getByTestId } = render(
      <DeleteButton className={className} data-testid={testId} />
    );
    const button = getByTestId(testId);
    expect(button).toHaveClass(className);
  });

  it("should call the onClick function when clicked", () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <DeleteButton onClick={onClick} data-testid={testId} />
    );
    const button = getByTestId(testId);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
