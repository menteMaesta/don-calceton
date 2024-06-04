import { render, fireEvent } from "@testing-library/react";
import ImageCard from "components/ImageCard";
import { IMAGE, IMAGE_CARD } from "helpers/test";

describe("ImageCard", () => {
  it("renders the image card correctly", () => {
    const { getByAltText, getByTestId } = render(
      <ImageCard onRemove={vi.fn()} image={IMAGE} />
    );

    const imageElement = getByAltText(IMAGE.name);
    const removeButton = getByTestId(
      IMAGE_CARD.remove.replace("{id}", IMAGE.src)
    );

    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute("src")).toBe(IMAGE.src);
    expect(imageElement.parentElement?.parentElement).toHaveClass(
      "flex flex-col",
      "items-center bg-white",
      "shadow rounded relative"
    );

    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveClass(
      "absolute right-2 top-2",
      "fa-solid fa-circle-xmark",
      "text-slate-300",
      "hover:text-slate-500 active:text-slate-500"
    );
  });

  it("calls the onRemove function when remove button is clicked", () => {
    const mockOnRemove = vi.fn();
    const { getByTestId } = render(
      <ImageCard onRemove={mockOnRemove} image={IMAGE} />
    );

    const removeButton = getByTestId(
      IMAGE_CARD.remove.replace("{id}", IMAGE.src)
    );
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});
