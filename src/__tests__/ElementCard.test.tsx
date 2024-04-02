import { render, screen, fireEvent } from "@testing-library/react";
import ElementCard from "components/ElementCard";
import { BrowserRouter } from "react-router-dom";

describe("ElementCard", () => {
  const mockElementId = "elementId";
  const mockTitle = "Mock Title";
  const mockChildren = <div>Mock Children</div>;
  const mockFooter = <div>Mock Footer</div>;
  const mockType = "product";
  const mockOnRemove = vi.fn();
  const mockRoute = "/mock-route";

  it("renders the card with correct props", () => {
    render(
      <BrowserRouter>
        <ElementCard
          elementId={mockElementId}
          title={mockTitle}
          children={mockChildren}
          footer={mockFooter}
          type={mockType}
          onRemove={mockOnRemove}
          route={mockRoute}
        />
      </BrowserRouter>
    );

    const card = screen.getByTestId(`${mockType}-link_${mockElementId}`);
    const removeButton = screen.getByTestId(
      `${mockType}-remove_${mockElementId}`
    );
    const title = screen.getByTestId(`${mockType}-name_${mockElementId}`);

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("href", mockRoute);
    expect(removeButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(mockTitle);
    expect(screen.getByText("Mock Children")).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    render(
      <BrowserRouter>
        <ElementCard
          elementId={mockElementId}
          title={mockTitle}
          children={mockChildren}
          footer={mockFooter}
          type={mockType}
          onRemove={mockOnRemove}
          route={mockRoute}
        />
      </BrowserRouter>
    );

    const removeButton = screen.getByTestId(
      `${mockType}-remove_${mockElementId}`
    );

    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith(
      expect.any(Object),
      mockElementId
    );
  });
});
