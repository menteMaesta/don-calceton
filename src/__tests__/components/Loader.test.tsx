import { render } from "@testing-library/react";
import Loader from "components/Loader";
import { SELECTORS } from "helpers/test";

describe("Loader", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Loader />);
    const loader = getByTestId(SELECTORS.loader);
    expect(loader).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(<Loader className="custom-loader" />);
    expect(container.firstChild).toHaveClass("custom-loader");
  });
});
