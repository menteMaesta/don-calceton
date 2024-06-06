import { render, fireEvent, act } from "@testing-library/react";
import { ORDER_ITEM_FIELDS } from "helpers/constants";
import RangeInput from "storeComponents/Personalization/components/RangeInput";
import { CUSTOMIZATIONS, PERSONALIZATION_SELECTORS } from "helpers/test";

describe("RangeInput", () => {
  test("should call onChange when input value changes", () => {
    const onChangeMock = vi.fn();
    const setSizeMock = vi.fn();

    const { getByTestId } = render(
      <RangeInput
        size={5}
        onChange={onChangeMock}
        setSize={setSizeMock}
        customizations={CUSTOMIZATIONS}
        customizationId={1}
      />
    );

    const inputElement = getByTestId(PERSONALIZATION_SELECTORS.sizeInput);
    act(() => fireEvent.change(inputElement, { target: { value: 10 } }));

    expect(onChangeMock).toHaveBeenCalledWith(ORDER_ITEM_FIELDS.IMAGE_SIZE, 10);
  });

  test("should call setSize when input value changes", () => {
    const onChangeMock = vi.fn();
    const setSizeMock = vi.fn();

    const { getByTestId } = render(
      <RangeInput
        size={15}
        onChange={onChangeMock}
        setSize={setSizeMock}
        customizations={CUSTOMIZATIONS}
        customizationId={2}
      />
    );

    const inputElement = getByTestId(PERSONALIZATION_SELECTORS.sizeInput);
    act(() => fireEvent.change(inputElement, { target: { value: 20 } }));

    expect(setSizeMock).toHaveBeenCalledWith(20);
  });
});
