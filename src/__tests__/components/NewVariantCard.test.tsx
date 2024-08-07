import { render, fireEvent } from "@testing-library/react";
import {
  NEW_VARIANT_CARD_ITEM,
  VARIANT_SELECTORS,
  DRAG_DROP_SELECTORS,
  ELEMENT_CARD,
  SLIDER_IMAGE_CARD,
} from "helpers/test";
import { es } from "helpers/strings";
import NewVariantCard from "components/NewVariantCard";

describe("NewVariantCard", () => {
  const mockSetVariants = vi.fn();

  it("renders initial components", () => {
    const { getByTestId } = render(
      <NewVariantCard
        variant={{ ...NEW_VARIANT_CARD_ITEM, images: [] }}
        index={0}
        setVariants={mockSetVariants}
      />
    );

    const titleInput = getByTestId(VARIANT_SELECTORS.newName);
    const quantityInput = getByTestId(VARIANT_SELECTORS.newQuantity);
    const dropZone = getByTestId(DRAG_DROP_SELECTORS.dropZone);
    const removeButton = getByTestId(
      ELEMENT_CARD.remove.replace("{type}", "variant").replace("{id}", "0")
    );

    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveValue(NEW_VARIANT_CARD_ITEM.name);
    expect(titleInput).toHaveAttribute(
      "placeholder",
      es.variants.namePlaceholder
    );
    expect(titleInput).toHaveClass("!w-11/12", "text-2xl");

    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toHaveValue(Number(NEW_VARIANT_CARD_ITEM.quantity));
    expect(quantityInput).toHaveAttribute(
      "placeholder",
      es.variants.stockPlaceholder
    );
    expect(quantityInput).toHaveClass("!rounded", "!px-1", "!py-0");

    expect(dropZone).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  it("shows correct elements when it has images", () => {
    const { getByTestId, queryByTestId } = render(
      <NewVariantCard
        variant={NEW_VARIANT_CARD_ITEM}
        index={0}
        setVariants={mockSetVariants}
      />
    );

    const titleInput = getByTestId(VARIANT_SELECTORS.newName);
    const quantityInput = getByTestId(VARIANT_SELECTORS.newQuantity);
    const removeButton = getByTestId(
      ELEMENT_CARD.remove.replace("{type}", "variant").replace("{id}", "0")
    );
    const image = getByTestId(
      SLIDER_IMAGE_CARD.image.replace(
        "{id}",
        `${NEW_VARIANT_CARD_ITEM.images[0].id}`
      )
    );

    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveValue(NEW_VARIANT_CARD_ITEM.name);

    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toHaveValue(Number(NEW_VARIANT_CARD_ITEM.quantity));

    expect(queryByTestId(DRAG_DROP_SELECTORS.dropZone)).not.toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  it("updates the variant title when input value changes", () => {
    const { getByTestId } = render(
      <NewVariantCard
        variant={NEW_VARIANT_CARD_ITEM}
        index={0}
        setVariants={mockSetVariants}
      />
    );

    const titleInput = getByTestId(VARIANT_SELECTORS.newName);
    fireEvent.change(titleInput, {
      target: { value: "New Title", name: "name" },
    });

    expect(mockSetVariants).toHaveBeenCalledOnce();
  });

  it("updates the variant quantity when input value changes", () => {
    const { getByTestId } = render(
      <NewVariantCard
        variant={NEW_VARIANT_CARD_ITEM}
        index={0}
        setVariants={mockSetVariants}
      />
    );

    const quantityInput = getByTestId(VARIANT_SELECTORS.newQuantity);
    fireEvent.change(quantityInput, {
      target: { value: 10, name: "quantity" },
    });

    expect(mockSetVariants).toHaveBeenCalled();
  });

  it("shows only integers legend when quantity input is a fraction", async () => {
    const { getByText } = render(
      <NewVariantCard
        variant={{ ...NEW_VARIANT_CARD_ITEM, quantity: "10.5" }}
        index={0}
        setVariants={mockSetVariants}
      />
    );

    expect(getByText(es.variants.onlyIntegers)).toBeInTheDocument();
  });
});
