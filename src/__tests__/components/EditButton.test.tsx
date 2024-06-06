import { render, fireEvent } from "@testing-library/react";
import EditButton from "components/EditButton";

describe("EditButton", () => {
  const testId = "edit-button";
  it("should render the button with the provided class name", () => {
    const { getByTestId } = render(
      <EditButton className="edit-button" data-testid={testId} />
    );
    const button = getByTestId(testId);
    expect(button).toHaveClass("edit-button");
  });

  it("should call the onClick function when clicked", () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <EditButton onClick={onClick} data-testid={testId} />
    );
    const button = getByTestId(testId);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
