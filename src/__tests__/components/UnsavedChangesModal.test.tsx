import { render, fireEvent } from "@testing-library/react";
import UnsavedChangesModal from "components/UnsavedChangesModal";
import { UNSAVED_CHANGES_MODAL_SELECTORS } from "helpers/test";
import { es } from "helpers/strings";

describe("UnsavedChangesModal", () => {
  test("renders modal with accept and cancel buttons", () => {
    const onAccept = vi.fn();
    const onCancel = vi.fn();

    const { getByTestId } = render(
      <UnsavedChangesModal
        isOpen={true}
        onAccept={onAccept}
        onCancel={onCancel}
      />
    );

    const dialog = getByTestId(UNSAVED_CHANGES_MODAL_SELECTORS.dialog);
    const accept = getByTestId(UNSAVED_CHANGES_MODAL_SELECTORS.accept);
    const cancel = getByTestId(UNSAVED_CHANGES_MODAL_SELECTORS.cancel);

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(es.unsavedChangesModal.title);
    expect(dialog).toHaveTextContent(es.unsavedChangesModal.description);
    expect(accept).toBeInTheDocument();
    expect(accept).toHaveTextContent(es.unsavedChangesModal.continue);
    expect(cancel).toBeInTheDocument();
    expect(cancel).toHaveTextContent(es.unsavedChangesModal.return);
  });

  test("calls onAccept when accept button is clicked", () => {
    const onAccept = vi.fn();
    const onCancel = vi.fn();

    const { getByTestId } = render(
      <UnsavedChangesModal
        isOpen={true}
        onAccept={onAccept}
        onCancel={onCancel}
      />
    );

    const accept = getByTestId(UNSAVED_CHANGES_MODAL_SELECTORS.accept);

    fireEvent.click(accept);

    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
  });

  test("calls onCancel when cancel button is clicked", () => {
    const onAccept = vi.fn();
    const onCancel = vi.fn();

    const { getByTestId } = render(
      <UnsavedChangesModal
        isOpen={true}
        onAccept={onAccept}
        onCancel={onCancel}
      />
    );

    const cancel = getByTestId(UNSAVED_CHANGES_MODAL_SELECTORS.cancel);
    fireEvent.click(cancel);

    expect(onAccept).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
