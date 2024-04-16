import { render, screen, fireEvent } from "@testing-library/react";
import VariantImageUploader from "components/VariantImageUploader";

describe("VariantImageUploader", () => {
  test("should call onFileSelect when a file is selected", () => {
    const onFileSelectMock = vi.fn();
    render(<VariantImageUploader onFileSelect={onFileSelectMock} />);

    const fileInput = screen.getByLabelText("Imagenes (PNG, JPG)");
    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(onFileSelectMock).toHaveBeenCalledWith(expect.any(Object));
  });

  test("should render with custom className", () => {
    const className = "custom-class";
    render(
      <VariantImageUploader onFileSelect={vi.fn()} className={className} />
    );

    const uploader = screen.getByTestId("variant-image-uploader");
    expect(uploader).toHaveClass(className);
  });
});
