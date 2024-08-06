import { render, fireEvent } from "@testing-library/react";
import { DRAG_DROP_SELECTORS, FILE } from "helpers/test";
import { es } from "helpers/strings";
import DragDropImageUploader from "components/DragDropImageUploader";

describe("DragDropImageUploader", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(
      <DragDropImageUploader onFileSelect={() => {}} onDropFile={() => {}} />
    );

    const dropZone = getByTestId(DRAG_DROP_SELECTORS.dropZone);
    const browseImages = getByTestId(DRAG_DROP_SELECTORS.browseImages);

    expect(dropZone).toBeInTheDocument();
    expect(dropZone).toHaveTextContent(es.variants.dragImages);
    expect(dropZone).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "rounded-md",
      "h-64"
    );
    expect(browseImages).toBeInTheDocument();
    expect(browseImages).toHaveTextContent(es.variants.browseImages);
    expect(browseImages).toHaveClass("font-bold");
  });

  it("should call onFileSelect when a file is selected", () => {
    const onFileSelectMock = vi.fn();
    const { getByLabelText } = render(
      <DragDropImageUploader
        onFileSelect={onFileSelectMock}
        onDropFile={() => {}}
      />
    );

    const browseImagesInput = getByLabelText(es.variants.browseImages);
    fireEvent.change(browseImagesInput, { target: { files: [FILE] } });

    expect(onFileSelectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ files: [FILE] }),
      })
    );
  });

  it("should call onDropFile when a file is dropped", () => {
    const onDropFileMock = vi.fn();
    const { getByTestId } = render(
      <DragDropImageUploader
        onFileSelect={() => {}}
        onDropFile={onDropFileMock}
      />
    );

    const dropZone = getByTestId(DRAG_DROP_SELECTORS.dropZone);
    fireEvent.drop(dropZone, { dataTransfer: { files: [FILE] } });

    expect(onDropFileMock).toHaveBeenCalledWith(
      expect.objectContaining({
        dataTransfer: expect.objectContaining({
          files: [FILE],
        }),
      })
    );
  });
});
