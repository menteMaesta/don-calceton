import { describe, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import ProductCard from "components/ProductCard.tsx";
import { ProductListItem } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";

describe("ProductCard", () => {
  it("renders correctly", () => {
    const product = {
      id: 1,
      name: "Test Product",
      price: 100,
      wholesalePrice: 80,
      description: "Test Description",
      updatedAt: "2021-10-10",
      createdAt: "2021-10-10",
      variants: [],
    } as ProductListItem;

    const { getByTestId } = render(
      <BrowserRouter>
        <ProductCard product={product} onRemove={vi.fn()} />
      </BrowserRouter>
    );
    const image = getByTestId("slider-image_default") as HTMLImageElement;
    const link = getByTestId("product-link_1") as HTMLAnchorElement;

    expect(link.getAttribute("href")).toEqual(
      ROUTES.PRODUCT.replace(":productId", "1")
    );
    expect(getByTestId("product-name_1").innerHTML).toEqual("Test Product");
    expect(getByTestId("price_1").innerHTML).toContain(product.price);
    expect(getByTestId("wholesale-price_1").innerHTML).toContain(
      product.wholesalePrice
    );
    expect(image.src).toEqual(
      "http://localhost:3000/src/assets/default-pic.png"
    );
    expect(getByTestId("product-description_1").innerHTML).toEqual(
      product.description
    );
  });
});
