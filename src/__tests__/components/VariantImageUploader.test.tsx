import { render, fireEvent } from "@testing-library/react";
import VariantImageUploader from "components/VariantImageUploader";
import { VARIANT_SELECTORS, FILE } from "helpers/test";
import { es } from "helpers/strings";

describe("VariantImageUploader", () => {
  test("should call onFileSelect when a file is selected", () => {
    const onFileSelectMock = vi.fn();
    const { getByLabelText } = render(
      <VariantImageUploader onFileSelect={onFileSelectMock} />
    );

    // const fileInput = getByTestId(VARIANT_SELECTORS.imageUploader);
    const fileInput = getByLabelText(es.imagesPngJpg);
    fireEvent.change(fileInput, { target: { files: [FILE] } });

    expect(onFileSelectMock).toHaveBeenCalledWith(expect.any(Object));
  });

  test("should render with custom className", () => {
    const className = "custom-class";
    const { getByTestId } = render(
      <VariantImageUploader onFileSelect={vi.fn()} className={className} />
    );

    const uploader = getByTestId(VARIANT_SELECTORS.imageUploader);
    expect(uploader).toHaveClass(className);
  });
});
