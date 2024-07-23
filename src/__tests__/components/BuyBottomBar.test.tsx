import { render, fireEvent, within } from "@testing-library/react";
import BuyBottomBar from "components/BuyBottomBar";
import { CART_SELECTORS } from "helpers/test";
import { es } from "helpers/strings";

describe("BuyBottomBar", () => {
  test("renders correctly", () => {
    const totalPrice = 10;
    const onSubmitOrder = vi.fn();

    const { getByTestId } = render(
      <BuyBottomBar totalPrice={totalPrice} onSubmitOrder={onSubmitOrder} />
    );

    const bottomBar = getByTestId(CART_SELECTORS.bottomBar);
    const totalPriceText = getByTestId(CART_SELECTORS.totalPrice);

    expect(bottomBar).toBeInTheDocument();
    expect(totalPriceText).toBeInTheDocument();
    expect(totalPriceText).toHaveTextContent(es.orders.totalPrice + totalPrice);
  });

  test("calls onSubmitOrder when Submit Order button is clicked", () => {
    const totalPrice = 10;
    const onSubmitOrder = vi.fn();

    const { getByTestId } = render(
      <BuyBottomBar totalPrice={totalPrice} onSubmitOrder={onSubmitOrder} />
    );

    const bottomBar = getByTestId(CART_SELECTORS.bottomBar);
    const submitButton = within(bottomBar).getByRole("button");
    fireEvent.click(submitButton);

    expect(onSubmitOrder).toHaveBeenCalledTimes(1);
  });
});
