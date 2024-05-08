import { render, fireEvent } from "@testing-library/react";
import AddProductButton from "storeComponents/AddProductButton";

describe("AddProductButton", () => {
  it("should call onAddToCart when clicked", () => {
    const onAddToCart = vi.fn();
    const { getByTestId, queryByTestId } = render(
      <AddProductButton onAddToCart={onAddToCart} onRemoveFromCart={vi.fn()} />
    );

    const button = getByTestId("add-to-cart");
    fireEvent.click(button);

    expect(onAddToCart).toHaveBeenCalled();
    expect(queryByTestId("remove-from-cart")).not.toBeInTheDocument();
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

    const button = getByTestId("remove-from-cart");
    fireEvent.click(button);

    expect(onRemoveFromCart).toHaveBeenCalled();
  });
});
