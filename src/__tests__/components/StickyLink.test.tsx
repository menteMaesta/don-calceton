import { render, screen } from "@testing-library/react";
import StickyLink from "components/StickyLink";
import { BrowserRouter } from "react-router-dom";

describe("StickyLink", () => {
  it("renders the link with the correct title and destination", () => {
    const testTitle = "Test Link";
    const testDestination = "/test";

    render(
      <BrowserRouter>
        <StickyLink to={testDestination} title={testTitle} />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole("link", { name: testTitle });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass(
      "w-36",
      "rounded",
      "mt-4",
      "mr-2",
      "py-2",
      "z-10",
      "text-center",
      "bg-slate-700",
      "text-white",
      "sticky",
      "top-12",
      "hover:bg-slate-800"
    );
    expect(linkElement).toHaveAttribute("href", testDestination);
  });
});
