import { render, fireEvent } from "@testing-library/react";
import SearchBar from "components/SearchBar";
import { SELECTORS } from "helpers/test";
import { es } from "helpers/strings";

describe("SearchBar", () => {
  test("should call onSearch with the entered search value", () => {
    const mockOnSearch = vi.fn();
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} placeholder={es.search} />
    );

    const searchInput = getByPlaceholderText(es.search);
    fireEvent.change(searchInput, { target: { value: "example search" } });

    expect(mockOnSearch).toHaveBeenCalledWith("example search");
  });

  test("should render search bar with styles", () => {
    const mockOnSearch = vi.fn();
    const { getByTestId } = render(
      <SearchBar onSearch={mockOnSearch} placeholder={es.search} />
    );

    const searchBar = getByTestId(SELECTORS.searchBar);
    expect(searchBar).toHaveClass(
      "w-4/5 sm:w-2/4 py-2 px-2",
      "rounded-lg border-slate-400",
      "focus-visible:border-slate-700",
      "border focus-visible:outline-0 focus-visible:outline-slate-500"
    );
  });
});
