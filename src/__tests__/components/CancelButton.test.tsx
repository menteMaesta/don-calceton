import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CancelButton from "components/CancelButton";

describe("CancelButton", () => {
  test("renders a cancel button with the correct link", () => {
    const to = "/home";
    const testId = "cancel-button";
    render(
      <BrowserRouter>
        <CancelButton to={to} data-testid={testId} />
      </BrowserRouter>
    );

    const cancelButton = screen.getByTestId(testId);
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveAttribute("href", to);
  });
});
