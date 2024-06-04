import { render, fireEvent } from "@testing-library/react";
import FileChip from "storeComponents/FileChip";

describe("FileChip", () => {
  const image = {
    name: "image.jpg",
    size: 365615,
  };

  it("renders FileChip components correctly", () => {
    const { getByTestId } = render(
      <FileChip image={image} onRemove={vi.fn()} />
    );
    const name = getByTestId("filechip_name");
    const size = getByTestId("filechip_size");
    const remove = getByTestId("filechip_remove-button");

    expect(name.textContent).toBe(image.name);
    expect(name).toHaveClass("truncate");
    expect(name).toHaveAttribute("title", image.name);
    expect(size.textContent).toBe((image.size / 1024).toFixed(2) + " KB");
    expect(size).toHaveClass("text-xs");
    expect(remove).toBeInTheDocument();
    expect(remove).toHaveClass(
      "absolute right-2 top-2",
      "fa-solid fa-circle-xmark",
      "text-slate-300",
      "hover:text-slate-500 active:text-slate-500"
    );
  });

  it("calls the onRemove function when remove button is clicked", () => {
    const onRemoveMock = vi.fn();
    const { getByTestId } = render(
      <FileChip image={image} onRemove={onRemoveMock} />
    );
    const remove = getByTestId("filechip_remove-button");
    fireEvent.click(remove);
    expect(onRemoveMock).toHaveBeenCalled();
  });
});
