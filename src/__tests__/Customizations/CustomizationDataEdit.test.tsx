import { render, fireEvent } from "@testing-library/react";
import CustomizationDataEdit from "routes/Customizations/CustomizationDataEdit";
import { CUSTOMIZATION, CUSTOMIZATION_SELECTORS } from "helpers/test";

describe("CustomizationDataEdit", () => {
  const onSaveMock = vi.fn();
  const onChangeMock = vi.fn();

  const defaultProps = {
    onSave: onSaveMock,
    onChange: onChangeMock,
    data: CUSTOMIZATION,
    customization: CUSTOMIZATION,
    valid: true,
  };

  it("should render correctly", () => {
    const { getByTestId } = render(<CustomizationDataEdit {...defaultProps} />);

    const saveButton = getByTestId(
      CUSTOMIZATION_SELECTORS.save.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const title = getByTestId(
      CUSTOMIZATION_SELECTORS.editTitle.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const minSize = getByTestId(
      CUSTOMIZATION_SELECTORS.editMinSize.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const maxSize = getByTestId(
      CUSTOMIZATION_SELECTORS.editMaxSize.replace("{id}", `${CUSTOMIZATION.id}`)
    );

    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveClass("!right-2");
    expect(title).toBeInTheDocument();
    expect(minSize).toBeInTheDocument();
    expect(maxSize).toBeInTheDocument();
  });

  it("should disable save if is not valid", () => {
    const { getByTestId } = render(
      <CustomizationDataEdit {...{ ...defaultProps, valid: false }} />
    );

    const saveButton = getByTestId(
      CUSTOMIZATION_SELECTORS.save.replace("{id}", `${CUSTOMIZATION.id}`)
    );

    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });

  it("should move save button in isNew mode", () => {
    const { getByTestId } = render(
      <CustomizationDataEdit {...{ ...defaultProps, isNew: true }} />
    );

    const saveButton = getByTestId(
      CUSTOMIZATION_SELECTORS.save.replace("{id}", `${CUSTOMIZATION.id}`)
    );

    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveClass("right-9");
  });

  it("should call onSave when Save button is clicked", () => {
    const { getByTestId } = render(<CustomizationDataEdit {...defaultProps} />);

    const saveButton = getByTestId(
      CUSTOMIZATION_SELECTORS.save.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    fireEvent.click(saveButton);
    expect(onSaveMock).toHaveBeenCalled();
  });

  it("should call onChange when input value changes", () => {
    const { getByTestId } = render(<CustomizationDataEdit {...defaultProps} />);

    const newTitle = "new value";
    const title = getByTestId(
      CUSTOMIZATION_SELECTORS.editTitle.replace("{id}", `${CUSTOMIZATION.id}`)
    );

    fireEvent.change(title, { target: { name: "title", value: newTitle } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
