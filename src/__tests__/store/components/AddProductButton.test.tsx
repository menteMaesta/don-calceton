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

  it("should have correct dark and light styles", () => {
    const onRemoveFromCart = vi.fn();
    const { getByTestId } = render(
      <AddProductButton
        onAddToCart={vi.fn()}
        onRemoveFromCart={onRemoveFromCart}
        inCart
      />
    );

    const button = getByTestId(CART_SELECTORS.remove);
    const lightStyles = [
      "bg-slate-800",
      "hover:bg-slate-700",
      "active:bg-slate-700",
    ];
    const darkStyles = [
      "dark:!bg-slate-500",
      "dark:hover:!bg-slate-600",
      "dark:active:!bg-slate-600",
    ];

    expect(button).toHaveClass(lightStyles.join(" "));
    expect(button).toHaveClass(darkStyles.join(" "));
  });
});
