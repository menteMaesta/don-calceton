import { DragEvent, ChangeEvent } from "react";
import { DRAG_DROP_SELECTORS } from "helpers/test";
import { es } from "helpers/strings";

type Props = {
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onDropFile: (event: DragEvent<HTMLDivElement>) => void;
  isLoading?: boolean;
};
export default function DragDropImageUploader({
  onFileSelect,
  onDropFile,
  isLoading = false,
}: Props) {
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={onDropFile}
      onDragOver={handleDragOver}
      className={
        "text-center w-full h-64 " +
        "flex flex-col " +
        "items-center justify-center " +
        "dark:bg-slate-600 bg-slate-100 " +
        "text-gray-500 dark:text-gray-400 " +
        "rounded-md"
      }
      data-testid={DRAG_DROP_SELECTORS.dropZone}
    >
      <i className="fa-solid fa-download text-xl" />
      <label
        className="font-bold"
        data-testid={DRAG_DROP_SELECTORS.browseImages}
      >
        {es.variants.browseImages}
        <input
          className="opacity-0 w-0 h-0 absolute -top-1"
          type="file"
          name="images"
          accept=".jpg, .jpeg, .png"
          multiple
          onChange={onFileSelect}
        />
      </label>
      <p>{es.variants.dragImages}</p>
      {isLoading && (
        <i
          className={"fa-solid fa-spinner " + "animate-spin mr-2 "}
          data-testid={DRAG_DROP_SELECTORS.loading}
        />
      )}
    </div>
  );
}
