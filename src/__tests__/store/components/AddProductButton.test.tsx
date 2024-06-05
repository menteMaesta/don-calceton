import { render, fireEvent } from "@testing-library/react";
import AddProductButton from "storeComponents/AddProductButton";
import { CART_SELECTORS } from "helpers/test";

describe("AddProductButton", () => {
  it("should call onAddToCart when clicked", () => {
    const onAddToCart = vi.fn();
    const { getByTestId, queryByTestId } = render(
      <AddProductButton onAddToCart={onAddToCart} onRemoveFromCart={vi.fn()} />
    );

    const button = getByTestId(CART_SELECTORS.add);
    fireEvent.click(button);

    expect(onAddToCart).toHaveBeenCalled();
    expect(queryByTestId(CART_SELECTORS.remove)).not.toBeInTheDocument();
  });

  it("should call onRemoveFromCart when clicked and inCart is true", () => {
    const onRemoveFromCart = vi.fn();
    const { getByTestId } = render(
      <AddProductButton
        onAddToCart={vi.fn()}
        onRemoveFromCart={onRemoveFromCart}
        inCart
      />
    );

    const button = getByTestId(CART_SELECTORS.remove);
    fireEvent.click(button);

    expect(onRemoveFromCart).toHaveBeenCalled();
  });
});
