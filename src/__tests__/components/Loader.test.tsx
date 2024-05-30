import { render } from "@testing-library/react";
import Loader from "components/Loader";

describe("Loader", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Loader />);
    const loader = getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(<Loader className="custom-loader" />);
    expect(container.firstChild).toHaveClass("custom-loader");
  });
});
