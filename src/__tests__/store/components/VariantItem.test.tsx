import { render } from "@testing-library/react";
import VariantItem from "storeComponents/VariantItem";
import {
  VARIANT_LIST_ITEM,
  ELEMENT_CARD,
  PRODUCT_CARD,
  VARIANT_SELECTORS,
  SLIDER_IMAGE_CARD,
  CART_SELECTORS,
} from "helpers/test";
import { es } from "helpers/strings";

describe("VariantItem", () => {
  it("renders variant name", () => {
    const { getByTestId } = render(
      <VariantItem
        variant={VARIANT_LIST_ITEM}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const title = getByTestId(
      ELEMENT_CARD.elementCard
        .replace("{type}", "variant")
        .replace(
          "{id}",
          VARIANT_SELECTORS.itemStoreCard.replace(
            "{id}",
            VARIANT_LIST_ITEM.id.toString()
          )
        )
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(VARIANT_LIST_ITEM.name);
  });

  it("renders variant price", () => {
    const { getByTestId } = render(
      <VariantItem
        variant={VARIANT_LIST_ITEM}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const price = getByTestId(PRODUCT_CARD.price.replace("{id}", "1"));
    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent(
      `Base: $${VARIANT_LIST_ITEM.productPrice} MXN`
    );
  });

  it("renders variant wholesale price", () => {
    const { getByTestId } = render(
      <VariantItem
        variant={VARIANT_LIST_ITEM}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const wholesale = getByTestId(
      PRODUCT_CARD.wholesalePrice.replace("{id}", "1")
    );
    expect(wholesale).toBeInTheDocument();
    expect(wholesale).toHaveTextContent(
      `Mayoreo: $${VARIANT_LIST_ITEM.productWholesalePrice} MXN`
    );
  });

  it("renders variant image", () => {
    const { getByTestId } = render(
      <VariantItem
        variant={VARIANT_LIST_ITEM}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const image = getByTestId(
      SLIDER_IMAGE_CARD.image.replace("{id}", "default")
    );
    expect(image).toBeInTheDocument();
  });

  it("renders default image", () => {
    const variantNoImage = {
      ...VARIANT_LIST_ITEM,
      images: undefined,
    };
    const { getByTestId } = render(
      <VariantItem
        variant={variantNoImage}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const image = getByTestId(
      SLIDER_IMAGE_CARD.image.replace("{id}", "default")
    );
    expect(image).toBeInTheDocument();
  });

  it("renders add item button", () => {
    const { getByTestId } = render(
      <VariantItem
        variant={VARIANT_LIST_ITEM}
        onAddToCart={vi.fn()}
        onRemoveFromCart={vi.fn()}
      />
    );
    const addButton = getByTestId(VARIANT_SELECTORS.addProduct);
    const addButtonText = getByTestId(CART_SELECTORS.add);
    expect(addButton).toBeInTheDocument();
    expect(addButtonText).toBeInTheDocument();
    expect(addButtonText).toHaveTextContent(es.add);
  });
});
