import { render } from "@testing-library/react";
import VariantItem from "storeComponents/VariantItem";

describe("VariantItem", () => {
  const variant = {
    id: 1,
    name: "Variant 1",
    quantity: 10,
    productId: 1,
    productName: "Product 1",
    productPrice: 10,
    productWholesalePrice: 5,
    images: { id: 1, name: "Image 1" },
  };

  it("renders variant name", () => {
    const { getByTestId } = render(
      <VariantItem
        variant={variant}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const title = getByTestId("variant-link_variant-item");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(variant.name);
  });

  it("renders variant price", () => {
    const { getByTestId } = render(
      <VariantItem
        variant={variant}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const price = getByTestId("price_1");
    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent(`Base $${variant.productPrice} MXN`);
  });

  it("renders variant wholesale price", () => {
    const { getByTestId } = render(
      <VariantItem
        variant={variant}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const wholesale = getByTestId("wholesale-price_1");
    expect(wholesale).toBeInTheDocument();
    expect(wholesale).toHaveTextContent(
      `Mayoreo $${variant.productWholesalePrice} MXN`
    );
  });

  it("renders variant image", () => {
    const { getByTestId } = render(
      <VariantItem
        variant={variant}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const image = getByTestId("store-item_1");
    expect(image).toBeInTheDocument();
  });

  it("renders default image", () => {
    const variantNoImage = {
      id: 1,
      name: "Variant 1",
      quantity: 10,
      productId: 1,
      productName: "Product 1",
      productPrice: 10,
      productWholesalePrice: 5,
    };
    const { getByTestId } = render(
      <VariantItem
        variant={variantNoImage}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const image = getByTestId("store-item_default");
    expect(image).toBeInTheDocument();
  });

  it("renders add item button", () => {
    const { getByTestId } = render(
      <VariantItem
        variant={variant}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const addButton = getByTestId("add-products_button");
    const addButtonText = getByTestId("add-to-cart");
    expect(addButton).toBeInTheDocument();
    expect(addButtonText).toBeInTheDocument();
    expect(addButtonText).toHaveTextContent("Agregar");
  });
});
