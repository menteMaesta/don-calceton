import { render, fireEvent } from "@testing-library/react";
import CustomizationDataEdit from "routes/Customizations/CustomizationDataEdit";

describe("CustomizationDataEdit", () => {
  const onSaveMock = vi.fn();
  const onChangeMock = vi.fn();

  const customization = {
    id: 1,
    title: "Al frente",
    maxSize: 20,
    minSize: 0,
  };
  const defaultProps = {
    onSave: onSaveMock,
    onChange: onChangeMock,
    data: customization,
    customization: customization,
    valid: true,
  };

  it("should render correctly", () => {
    const { getByTestId } = render(<CustomizationDataEdit {...defaultProps} />);

    const saveButton = getByTestId(`save-customization_${customization.id}`);
    const title = getByTestId(`title-edit_${customization.id}`);
    const minSize = getByTestId(`min-size-edit_${customization.id}`);
    const maxSize = getByTestId(`max-size-edit_${customization.id}`);

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

    const saveButton = getByTestId(`save-customization_${customization.id}`);

    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });

  it("should move save button in isNew mode", () => {
    const { getByTestId } = render(
      <CustomizationDataEdit {...{ ...defaultProps, isNew: true }} />
    );

    const saveButton = getByTestId(`save-customization_${customization.id}`);

    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveClass("right-9");
  });

  it("should call onSave when Save button is clicked", () => {
    const { getByTestId } = render(<CustomizationDataEdit {...defaultProps} />);

    const saveButton = getByTestId(`save-customization_${customization.id}`);
    fireEvent.click(saveButton);
    expect(onSaveMock).toHaveBeenCalled();
  });

  it("should call onChange when input value changes", () => {
    const { getByTestId } = render(<CustomizationDataEdit {...defaultProps} />);

    const newTitle = "new value";
    const title = getByTestId(`title-edit_${customization.id}`);

    fireEvent.change(title, { target: { name: "title", value: newTitle } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
