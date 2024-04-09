import { render, screen } from "@testing-library/react";
import EmptyState from "components/EmptyState";

describe("EmptyState", () => {
  it("renders the empty state component with the provided name", () => {
    const name = "Productos";

    const { container } = render(<EmptyState name={name} />);

    const emptyStateElement = screen.getByText(`No hay ${name}`);
    const icon = container.querySelector("[class*='fa-couch']");

    expect(emptyStateElement).toHaveClass(
      "flex flex-col",
      "items-center justify-center",
      "text-slate-300 mt-28"
    );

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("fa-solid fa-couch text-4xl");
  });
});
