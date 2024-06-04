import { describe, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import ProductCard from "components/ProductCard.tsx";
import { ROUTES } from "helpers/constants";
import {
  PRODUCT,
  ELEMENT_CARD,
  SLIDER_IMAGE_CARD,
  PRODUCT_CARD,
} from "helpers/test";

describe("ProductCard", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ProductCard product={PRODUCT} onRemove={vi.fn()} />
      </BrowserRouter>
    );
    const image = getByTestId(
      SLIDER_IMAGE_CARD.image.replace("{id}", "default")
    ) as HTMLImageElement;
    const link = getByTestId(
      ELEMENT_CARD.elementCard
        .replace("{type}", "product")
        .replace("{id}", `${PRODUCT.id}`)
    ) as HTMLAnchorElement;

    expect(link.getAttribute("href")).toEqual(
      ROUTES.PRODUCT.replace(":productId", "1")
    );
    expect(
      getByTestId(PRODUCT_CARD.name.replace("{id}", `${PRODUCT.id}`)).innerHTML
    ).toEqual("Test Product");
    expect(
      getByTestId(PRODUCT_CARD.price.replace("{id}", `${PRODUCT.id}`)).innerHTML
    ).toContain(PRODUCT.price);
    expect(
      getByTestId(PRODUCT_CARD.wholesalePrice.replace("{id}", `${PRODUCT.id}`))
        .innerHTML
    ).toContain(PRODUCT.wholesalePrice);
    expect(image.src).toEqual(
      "http://localhost:3000/src/assets/default-pic.png"
    );
    expect(
      getByTestId(PRODUCT_CARD.description.replace("{id}", `${PRODUCT.id}`))
        .innerHTML
    ).toEqual(PRODUCT.description);
  });
});
