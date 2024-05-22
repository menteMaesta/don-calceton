import { render, fireEvent, act } from "@testing-library/react";
import { ORDER_ITEM_FIELDS } from "helpers/constants";
import RangeInput from "storeComponents/Personalization/components/RangeInput";

describe("RangeInput", () => {
  const customizations = [
    { id: 1, title: "Option 1", maxSize: 10, minSize: 5 },
    { id: 2, title: "Option 2", maxSize: 20, minSize: 15 },
    { id: 3, title: "Option 3", maxSize: 30, minSize: 25 },
  ];

  test("should call onChange when input value changes", () => {
    const onChangeMock = vi.fn();
    const setSizeMock = vi.fn();

    const { getByTestId } = render(
      <RangeInput
        size={5}
        onChange={onChangeMock}
        setSize={setSizeMock}
        customizations={customizations}
        customizationId={1}
      />
    );

    const inputElement = getByTestId("order-item_size-input");
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
        customizations={customizations}
        customizationId={2}
      />
    );

    const inputElement = getByTestId("order-item_size-input");
    act(() => fireEvent.change(inputElement, { target: { value: 20 } }));

    expect(setSizeMock).toHaveBeenCalledWith(20);
  });
});
