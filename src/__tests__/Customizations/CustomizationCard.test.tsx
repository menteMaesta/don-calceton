import { act } from "react";
import { render, fireEvent, within } from "@testing-library/react";
import CustomizationCard from "routes/Customizations/CustomizationCard";
import { CUSTOMIZATION, CUSTOMIZATION_SELECTORS } from "helpers/test";

describe("CustomizationCard", () => {
  const onSaveData = vi.fn();
  const onRemove = vi.fn();

  test("renders customization card correctly", () => {
    const { getByTestId } = render(
      <CustomizationCard
        customization={CUSTOMIZATION}
        onSaveData={onSaveData}
        onRemove={onRemove}
      />
    );

    const card = getByTestId(
      CUSTOMIZATION_SELECTORS.card.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const removeButton = within(card).getByTestId(
      CUSTOMIZATION_SELECTORS.remove
    );
    const editButton = within(card).getByTestId(CUSTOMIZATION_SELECTORS.edit);
    const title = within(card).getByTestId(
      CUSTOMIZATION_SELECTORS.title.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const minSize = within(card).getByTestId(
      CUSTOMIZATION_SELECTORS.minSize.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const maxSize = within(card).getByTestId(
      CUSTOMIZATION_SELECTORS.maxSize.replace("{id}", `${CUSTOMIZATION.id}`)
    );

    expect(card).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(title).toHaveTextContent(CUSTOMIZATION.title);
    expect(minSize).toHaveTextContent(
      `Imagen min: ${CUSTOMIZATION.minSize} cm`
    );
    expect(maxSize).toHaveTextContent(
      `Imagen max: ${CUSTOMIZATION.maxSize} cm`
    );
  });

  test("renders isNew mode of customization card correctly", () => {
    const { getByTestId } = render(
      <CustomizationCard
        customization={CUSTOMIZATION}
        onSaveData={onSaveData}
        onRemove={onRemove}
        isNew
      />
    );

    const card = getByTestId(
      CUSTOMIZATION_SELECTORS.card.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const editTitle = within(card).getByTestId(
      CUSTOMIZATION_SELECTORS.editTitle.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const removeButton = within(card).getByTestId(
      CUSTOMIZATION_SELECTORS.remove
    );
    const editButton = within(card).queryByTestId(CUSTOMIZATION_SELECTORS.edit);

    expect(card).toBeInTheDocument();
    expect(editTitle).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();
  });

  test("renders edit mode correctly", () => {
    const { getByTestId, queryByTestId } = render(
      <CustomizationCard
        customization={CUSTOMIZATION}
        onSaveData={onSaveData}
        onRemove={onRemove}
      />
    );

    const card = getByTestId(
      CUSTOMIZATION_SELECTORS.card.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const editButton = within(card).getByTestId(CUSTOMIZATION_SELECTORS.edit);

    expect(
      queryByTestId(
        CUSTOMIZATION_SELECTORS.save.replace("{id}", `${CUSTOMIZATION.id}`)
      )
    ).not.toBeInTheDocument();
    expect(card).toBeInTheDocument();
    act(() => fireEvent.click(editButton));
    expect(
      getByTestId(
        CUSTOMIZATION_SELECTORS.save.replace("{id}", `${CUSTOMIZATION.id}`)
      )
    ).toBeInTheDocument();
  });

  test("calls onSaveData when data is saved", () => {
    const { getByTestId } = render(
      <CustomizationCard
        customization={CUSTOMIZATION}
        onSaveData={onSaveData}
        onRemove={onRemove}
        isNew
      />
    );

    const newTitle = "New customization";
    const card = getByTestId(
      CUSTOMIZATION_SELECTORS.card.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const editTitle = within(card).getByTestId(
      CUSTOMIZATION_SELECTORS.editTitle.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const saveButton = within(card).getByTestId(
      CUSTOMIZATION_SELECTORS.save.replace("{id}", `${CUSTOMIZATION.id}`)
    );

    fireEvent.change(editTitle, {
      target: { name: "title", value: newTitle },
    });
    fireEvent.click(saveButton);

    // Assert that onSaveData is called with the correct data
    expect(onSaveData).toHaveBeenCalledWith({
      ...CUSTOMIZATION,
      title: newTitle,
    });
  });

  test("calls onRemove when remove button is clicked", () => {
    const { getByTestId } = render(
      <CustomizationCard
        customization={CUSTOMIZATION}
        onSaveData={onSaveData}
        onRemove={onRemove}
      />
    );

    const card = getByTestId(
      CUSTOMIZATION_SELECTORS.card.replace("{id}", `${CUSTOMIZATION.id}`)
    );
    const removeButton = within(card).getByTestId(
      CUSTOMIZATION_SELECTORS.remove
    );

    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
