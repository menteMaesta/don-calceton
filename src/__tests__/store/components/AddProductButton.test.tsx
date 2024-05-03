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
    expect(queryByTestId("add-item-to-cart")).not.toBeInTheDocument();
    expect(queryByTestId("remove-from-cart")).not.toBeInTheDocument();
  });

  it("should call onAddToCart when clicked and inCart is greater than 0", () => {
    const onAddToCart = vi.fn();
    const { getByTestId, queryByTestId } = render(
      <AddProductButton
        onAddToCart={onAddToCart}
        onRemoveFromCart={vi.fn()}
        inCart={2}
      />
    );

    const button = getByTestId("add-item-to-cart");
    fireEvent.click(button);

    expect(onAddToCart).toHaveBeenCalled();
    expect(queryByTestId("add-to-cart")).not.toBeInTheDocument();
  });

  it("should call onRemoveFromCart when clicked and inCart is greater than 0", () => {
    const onRemoveFromCart = vi.fn();
    const { getByTestId } = render(
      <AddProductButton
        onAddToCart={vi.fn()}
        onRemoveFromCart={onRemoveFromCart}
        inCart={1}
      />
    );

    const button = getByTestId("remove-from-cart");
    fireEvent.click(button);

    expect(onRemoveFromCart).toHaveBeenCalled();
  });
});
