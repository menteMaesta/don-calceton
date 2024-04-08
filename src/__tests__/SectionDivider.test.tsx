import { render } from "@testing-library/react";
import SectionDivider from "components/SectionDivider";

describe("SectionDivider", () => {
  it("renders the section name correctly", () => {
    const section = "Example Section";
    const { getByText } = render(<SectionDivider section={section} />);
    const sectionName = getByText(section);
    expect(sectionName).toBeInTheDocument();
    expect(sectionName).toHaveClass(
      "text-gray-300",
      "bg-slate-50",
      "font-light",
      "px-3",
      "absolute",
      "sm:start-1/2",
      "start-[38%]"
    );
  });
});
