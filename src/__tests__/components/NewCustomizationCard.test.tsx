import { render, screen, fireEvent } from "@testing-library/react";
import NewCustomizationCard from "components/NewCustomizationCard";
import { CUSTOMIZATION_SELECTORS, NEW_CUSTOMIZATION } from "helpers/test";
import { es } from "helpers/strings";

describe("NewCustomizationCard", () => {
  const mockSetCustomizations = vi.fn();

  beforeEach(() => {
    render(
      <NewCustomizationCard
        index={0}
        customization={NEW_CUSTOMIZATION}
        setCustomizations={mockSetCustomizations}
      />
    );
  });

  test("renders all elements", () => {
    const card = screen.getByTestId(
      CUSTOMIZATION_SELECTORS.card.replace("{id}", "")
    );
    const deleteButton = screen.getByTestId(CUSTOMIZATION_SELECTORS.remove);
    const title = screen.getByTestId(
      CUSTOMIZATION_SELECTORS.editTitle.replace("{id}", "")
    );
    const minSize = screen.getByTestId(
      CUSTOMIZATION_SELECTORS.editMinSize.replace("{id}", "")
    );
    const maxSize = screen.getByTestId(
      CUSTOMIZATION_SELECTORS.editMaxSize.replace("{id}", "")
    );

    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(
      "bg-white",
      "pr-8",
      "dark:bg-slate-700",
      "dark:text-slate-200"
    );
    expect(deleteButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute(
      "placeholder",
      es.customizations.titlePlaceholder
    );
    expect(minSize).toBeInTheDocument();
    expect(minSize).toHaveAttribute(
      "placeholder",
      es.customizations.minSizePlaceholder
    );
    expect(maxSize).toBeInTheDocument();
    expect(maxSize).toHaveAttribute(
      "placeholder",
      es.customizations.maxSizePlaceholder
    );
  });

  test("calls setCustomizations when delete button is clicked", () => {
    const deleteButton = screen.getByTestId(CUSTOMIZATION_SELECTORS.remove);
    fireEvent.click(deleteButton);
    expect(mockSetCustomizations).toHaveBeenCalledTimes(1);
  });

  test("calls setCustomizations when title is changed", () => {
    const title = screen.getByTestId(
      CUSTOMIZATION_SELECTORS.editTitle.replace("{id}", "")
    );

    fireEvent.change(title, { target: { name: "title", value: "New Title" } });
    expect(mockSetCustomizations).toHaveBeenCalled();
  });
});
