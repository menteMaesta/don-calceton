import { render, fireEvent, within, act } from "@testing-library/react";
import { ORDER_ITEM_FIELDS } from "helpers/constants";
import QuantitySelector from "storeComponents/Personalization/components/QuantitySelector";

describe("QuantitySelector", () => {
  test("should render the quantity selector with the correct initial value", () => {
    const quantity = 2;
    const maxQuantity = 10;
    const onChange = vi.fn();

    const { getByTestId } = render(
      <QuantitySelector
        quantity={quantity}
        maxQuantity={maxQuantity}
        onChange={onChange}
      />
    );

    const quantityWrapp = getByTestId("order-item_quantity");
    const quantitySelector = within(quantityWrapp).getByTestId(
      "form-item_label-children"
    ).children[0];
    expect(quantitySelector.textContent).toBe(quantity.toString());
  });

  test("should call the onChange function with the updated quantity value", () => {
    const quantity = 2;
    const maxQuantity = 10;
    const onChange = vi.fn();

    const { getByTestId, getByText } = render(
      <QuantitySelector
        quantity={quantity}
        maxQuantity={maxQuantity}
        onChange={onChange}
      />
    );

    const quantityWrapp = getByTestId("order-item_quantity");
    const quantitySelector = within(quantityWrapp).getByTestId(
      "form-item_label-children"
    ).children[0];

    act(() => fireEvent.keyDown(quantitySelector, { key: "ArrowDown" }));
    act(() => getByText("5").click());
    expect(onChange).toHaveBeenCalledWith(ORDER_ITEM_FIELDS.QUANTITY, 5);
  });
});
