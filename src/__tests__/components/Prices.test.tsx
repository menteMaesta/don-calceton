import { render } from "@testing-library/react";
import Prices from "components/Prices";
import { PRODUCT, PRODUCT_CARD } from "helpers/test";
import { es } from "helpers/strings";

describe("Prices component", () => {
  it("renders the price and wholesale price", () => {
    const { getByTestId } = render(
      <Prices
        id={PRODUCT.id}
        price={PRODUCT.price}
        wholesalePrice={PRODUCT.wholesalePrice}
      />
    );

    const priceElement = getByTestId(
      PRODUCT_CARD.price.replace("{id}", `${PRODUCT.id}`)
    );
    const wholesalePriceElement = getByTestId(
      PRODUCT_CARD.wholesalePrice.replace("{id}", `${PRODUCT.id}`)
    );

    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveTextContent(
      `${es.products.base}${PRODUCT.price}`
    );
    expect(wholesalePriceElement).toBeInTheDocument();
    expect(wholesalePriceElement).toHaveTextContent(
      `${es.products.wholesalePrice}${PRODUCT.wholesalePrice}`
    );
  });

  it("renders correct base classNames", () => {
    const { getByTestId } = render(
      <Prices
        id={PRODUCT.id}
        price={PRODUCT.price}
        wholesalePrice={PRODUCT.wholesalePrice}
      />
    );

    const baseClasses = [
      "bg-slate-950 text-white",
      "w-fit sm:text-sm",
      "rounded-full px-2",
      "dark:bg-slate-500",
    ];
    const darkClasses = "dark:bg-slate-500";
    const priceElement = getByTestId(
      PRODUCT_CARD.price.replace("{id}", `${PRODUCT.id}`)
    );
    const wholesalePriceElement = getByTestId(
      PRODUCT_CARD.wholesalePrice.replace("{id}", `${PRODUCT.id}`)
    );

    expect(priceElement).toHaveClass([...baseClasses, darkClasses].join(" "));
    expect(wholesalePriceElement).toHaveClass(
      [...baseClasses, "mt-1", darkClasses].join(" ")
    );
  });
});
