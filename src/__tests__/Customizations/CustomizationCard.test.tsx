import { render, fireEvent, within } from "@testing-library/react";
import CustomizationCard from "routes/Customizations/CustomizationCard";

describe("CustomizationCard", () => {
  const customization = {
    id: 1,
    title: "Al frente",
    maxSize: 20,
    minSize: 0,
  };

  const onSaveData = vi.fn();
  const onRemove = vi.fn();

  test("renders customization card correctly", () => {
    const { getByTestId } = render(
      <CustomizationCard
        customization={customization}
        onSaveData={onSaveData}
        onRemove={onRemove}
      />
    );

    const card = getByTestId(`customization_card-${customization.id}`);
    const removeButton = within(card).getByTestId("remove-customization");
    const title = within(card).getByTestId(`title-${customization.id}`);
    const minSize = within(card).getByTestId(`min-size-${customization.id}`);
    const maxSize = within(card).getByTestId(`max-size-${customization.id}`);

    expect(card).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(title).toHaveTextContent(customization.title);
    expect(minSize).toHaveTextContent(
      `Imagen min: ${customization.minSize} cm`
    );
    expect(maxSize).toHaveTextContent(
      `Imagen max: ${customization.maxSize} cm`
    );
  });

  test("renders isNew mode of customization card correctly", () => {
    const { getByTestId } = render(
      <CustomizationCard
        customization={customization}
        onSaveData={onSaveData}
        onRemove={onRemove}
        isNew
      />
    );

    const card = getByTestId(`customization_card-${customization.id}`);
    const editTitle = within(card).getByTestId(
      `title-edit_${customization.id}`
    );

    expect(card).toBeInTheDocument();
    expect(editTitle).toBeInTheDocument();
  });

  test("calls onSaveData when data is saved", () => {
    const { getByTestId } = render(
      <CustomizationCard
        customization={customization}
        onSaveData={onSaveData}
        onRemove={onRemove}
        isNew
      />
    );

    const newTitle = "New customization";
    const card = getByTestId(`customization_card-${customization.id}`);
    const editTitle = within(card).getByTestId(
      `title-edit_${customization.id}`
    );
    const saveButton = within(card).getByTestId(
      `save-customization_${customization.id}`
    );

    fireEvent.change(editTitle, {
      target: { name: "title", value: newTitle },
    });
    fireEvent.click(saveButton);

    // Assert that onSaveData is called with the correct data
    expect(onSaveData).toHaveBeenCalledWith({
      ...customization,
      title: newTitle,
    });
  });

  test("calls onRemove when remove button is clicked", () => {
    const { getByTestId } = render(
      <CustomizationCard
        customization={customization}
        onSaveData={onSaveData}
        onRemove={onRemove}
      />
    );

    const card = getByTestId(`customization_card-${customization.id}`);
    const removeButton = within(card).getByTestId("remove-customization");

    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
