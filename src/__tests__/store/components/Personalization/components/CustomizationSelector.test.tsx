import { render, screen, fireEvent, within, act } from "@testing-library/react";
import { ORDER_ITEM_FIELDS } from "helpers/constants";
import CustomizationSelector from "storeComponents/Personalization/components/CustomizationSelector";
import {
  PERSONALIZATION_SELECTORS,
  SELECTORS,
  CUSTOMIZATIONS,
} from "helpers/test";

describe("CustomizationSelector", () => {
  test("renders the customization selector with options", () => {
    const { getByTestId } = render(
      <CustomizationSelector
        customizations={CUSTOMIZATIONS}
        onChange={vi.fn()}
        setSize={vi.fn()}
      />
    );

    const selectWrapper = getByTestId(PERSONALIZATION_SELECTORS.customization);
    const customizationSelector = within(selectWrapper).getByTestId(
      SELECTORS.formItemChildren
    ).children[0];

    expect(selectWrapper).toBeInTheDocument();
    expect(customizationSelector).toBeInTheDocument();
    act(() => fireEvent.keyDown(customizationSelector, { key: "ArrowDown" }));

    CUSTOMIZATIONS.forEach((customization) => {
      const optionElement = screen.getByText(customization.title);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test("calls the onChange function when an option is selected", () => {
    const onChange = vi.fn();
    const { getByTestId, getByText } = render(
      <CustomizationSelector
        customizations={CUSTOMIZATIONS}
        onChange={onChange}
        setSize={vi.fn()}
      />
    );

    const selectWrapper = getByTestId(PERSONALIZATION_SELECTORS.customization);
    const customizationSelector = within(selectWrapper).getByTestId(
      SELECTORS.formItemChildren
    ).children[0];
    act(() => fireEvent.keyDown(customizationSelector, { key: "ArrowDown" }));
    act(() => getByText(CUSTOMIZATIONS[0].title).click());

    expect(onChange).toHaveBeenCalledWith(
      ORDER_ITEM_FIELDS.CUSTOMIZATION_ID,
      CUSTOMIZATIONS[0].id
    );
  });

  test("calls the setSize function when an option is selected", () => {
    const setSize = vi.fn();
    const { getByTestId, getByText } = render(
      <CustomizationSelector
        customizations={CUSTOMIZATIONS}
        onChange={vi.fn()}
        setSize={setSize}
      />
    );

    const selectWrapper = getByTestId(PERSONALIZATION_SELECTORS.customization);
    const customizationSelector = within(selectWrapper).getByTestId(
      SELECTORS.formItemChildren
    ).children[0];
    act(() => fireEvent.keyDown(customizationSelector, { key: "ArrowDown" }));
    act(() => getByText(CUSTOMIZATIONS[2].title).click());

    expect(setSize).toHaveBeenCalledWith(0);
  });
});
