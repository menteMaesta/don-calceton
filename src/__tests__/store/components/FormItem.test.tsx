import { render } from "@testing-library/react";
import FormItem from "storeComponents/FormItem";
import { SELECTORS } from "helpers/test";

describe("FormItem", () => {
  it("renders the title and children correctly", () => {
    const title = "Test Title";
    const children = <div>Test Children</div>;

    const { getByText, getByTestId } = render(
      <FormItem title={title} data-testid="label_wrapper">
        {children}
      </FormItem>
    );
    const formTitle = getByTestId(SELECTORS.formItemTitle);
    const formChildren = getByText("Test Children");
    const wrapper = getByTestId(SELECTORS.labelWrapper);

    expect(formTitle).toBeInTheDocument();
    expect(formChildren).toBeInTheDocument();
    expect(formChildren.parentElement).toHaveClass("relative sm:w-9/12 w-full");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass(
      "flex flex-wrap sm:flex-nowrap items-start justify-between mb-2"
    );
  });

  it("renders only the title when children are not provided", () => {
    const { getByTestId, queryByTestId } = render(
      <FormItem title="Test Title" />
    );
    const title = getByTestId(SELECTORS.formItemTitle);
    const children = queryByTestId(SELECTORS.formItemChildren);

    expect(title).toBeInTheDocument();
    expect(children).toBeNull();
  });
});
