import { render } from "@testing-library/react";
import SectionDivider from "components/SectionDivider";

describe("SectionDivider", () => {
  it("renders the section name correctly", () => {
    const section = "Example Section";
    const { getByText, getByTestId } = render(
      <SectionDivider section={section} />
    );
    const sectionDivider = getByTestId("section-divider");
    const sectionName = getByText(section);

    expect(sectionDivider).toBeInTheDocument();
    expect(sectionName).toBeInTheDocument();
    expect(sectionDivider).toHaveClass(
      "text-gray-300",
      "font-light",
      "absolute",
      "flex items-center",
      "justify-center w-full"
    );
    expect(sectionName).toHaveClass("bg-slate-50 px-3");
  });
});
