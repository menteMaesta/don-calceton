import { render, fireEvent } from "@testing-library/react";
import FileChip from "storeComponents/FileChip";
import { IMAGE, FILE_CHIP_SELECTORS } from "helpers/test";

describe("FileChip", () => {
  it("renders FileChip components correctly", () => {
    const { getByTestId } = render(
      <FileChip image={IMAGE} onRemove={vi.fn()} />
    );
    const name = getByTestId(FILE_CHIP_SELECTORS.name);
    const size = getByTestId(FILE_CHIP_SELECTORS.size);
    const remove = getByTestId(FILE_CHIP_SELECTORS.remove);

    expect(name.textContent).toBe(IMAGE.name);
    expect(name).toHaveClass("truncate");
    expect(name).toHaveAttribute("title", IMAGE.name);
    expect(size.textContent).toBe((IMAGE.size / 1024).toFixed(2) + " KB");
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
      <FileChip image={IMAGE} onRemove={onRemoveMock} />
    );
    const remove = getByTestId(FILE_CHIP_SELECTORS.remove);
    fireEvent.click(remove);
    expect(onRemoveMock).toHaveBeenCalled();
  });
});
