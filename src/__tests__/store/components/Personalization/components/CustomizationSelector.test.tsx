import { render, screen, fireEvent, within, act } from "@testing-library/react";
import CustomizationSelector from "storeComponents/Personalization/components/CustomizationSelector";

describe("CustomizationSelector", () => {
  const customizations = [
    { id: 1, title: "Option 1", maxSize: 10, minSize: 5 },
    { id: 2, title: "Option 2", maxSize: 20, minSize: 15 },
    { id: 3, title: "Option 3", maxSize: 30, minSize: 25 },
  ];

  test("renders the customization selector with options", () => {
    const { getByTestId } = render(
      <CustomizationSelector
        customizations={customizations}
        onChange={vi.fn()}
        setSize={vi.fn()}
      />
    );

    const selectWrapper = getByTestId("order-item_customization");
    const customizationSelector = within(selectWrapper).getByTestId(
      "form-item_label-children"
    ).children[0];

    expect(selectWrapper).toBeInTheDocument();
    expect(customizationSelector).toBeInTheDocument();
    act(() => fireEvent.keyDown(customizationSelector, { key: "ArrowDown" }));

    customizations.forEach((customization) => {
      const optionElement = screen.getByText(customization.title);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test("calls the onChange function when an option is selected", () => {
    const onChange = vi.fn();
    const { getByTestId, getByText } = render(
      <CustomizationSelector
        customizations={customizations}
        onChange={onChange}
        setSize={vi.fn()}
      />
    );

    const selectWrapper = getByTestId("order-item_customization");
    const customizationSelector = within(selectWrapper).getByTestId(
      "form-item_label-children"
    ).children[0];
    act(() => fireEvent.keyDown(customizationSelector, { key: "ArrowDown" }));
    act(() => getByText(customizations[0].title).click());

    expect(onChange).toHaveBeenCalledWith(
      "customizationId",
      customizations[0].id
    );
  });

  test("calls the setSize function when an option is selected", () => {
    const setSize = vi.fn();
    const { getByTestId, getByText } = render(
      <CustomizationSelector
        customizations={customizations}
        onChange={vi.fn()}
        setSize={setSize}
      />
    );

    const selectWrapper = getByTestId("order-item_customization");
    const customizationSelector = within(selectWrapper).getByTestId(
      "form-item_label-children"
    ).children[0];
    act(() => fireEvent.keyDown(customizationSelector, { key: "ArrowDown" }));
    act(() => getByText(customizations[2].title).click());

    expect(setSize).toHaveBeenCalledWith(0);
  });
});
