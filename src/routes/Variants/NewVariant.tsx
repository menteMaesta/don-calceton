import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { useSubmit, useParams, Link, useActionData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import classnames from "classnames";
import imageCompression from "browser-image-compression";
import { VariantBase, Blob, ErrorType } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import { es } from "helpers/strings";
import ImageCard from "components/ImageCard";
import Button from "components/Button";
import Input from "components/Input";
import VariantImageUploader from "components/VariantImageUploader";

export default function NewVariant() {
  const { productId = "" } = useParams();
  const submit = useSubmit();
  const actionData = useActionData() as ErrorType;
  const [openSnackbar] = useSnackbar();
  const [data, setData] = useState<VariantBase>();
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [valid, setValid] = useState(true);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData(
      (prev) =>
        ({ ...prev, [event.target.name]: event.target.value } as VariantBase)
    );
    if (event.target.name === "quantity") {
      if (event.target.value.includes(".")) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  };

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const previews = [];
    if (files) {
      for (const file of files) {
        previews.push({
          src: URL.createObjectURL(file),
          name: file.name,
          file,
        });
      }
      setBlobs(previews);
    }
  };

  const onRemoveFile = (event: MouseEvent<HTMLElement>, index: number) => {
    event.preventDefault();
    if (blobs?.length > 0) {
      setBlobs((prev) => prev.filter((_, key) => key !== index));
    }
  };
  const onSave = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    formData.append("data", JSON.stringify(data));
    formData.append("variant", "create");
    formData.append("productId", productId);
    for (const blob of blobs) {
      try {
        const compressedFile = await imageCompression(blob.file, options);
        formData.append("images[]", compressedFile, blob.name);
      } catch (error) {
        console.log(error);
      }
    }
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div className="mt-11 w-full px-4" data-testid="new-variant_page">
      <p className="mt-9 font-semibold text-center text-lg">
        {es.variants.new}
      </p>
      <div className="flex flex-col mt-14 space-y-6 items-center">
        <Input
          label={es.name}
          name="name"
          placeholder={es.variants.namePlaceholder}
          value={data?.name || ""}
          onChange={onChange}
          labelClassName="w-full sm:w-3/6"
          data-testid="new-variant-name_input"
        />

        <Input
          label={es.variants.stock}
          type="number"
          name="quantity"
          step="1"
          placeholder={es.variants.stockPlaceholder}
          value={data?.quantity || ""}
          onChange={onChange}
          labelClassName="w-full sm:w-3/6"
          otherElements={
            valid ? undefined : (
              <p className={classnames("text-red-900", "text-sm pl-2")}>
                {es.variants.onlyIntegers}
              </p>
            )
          }
          data-testid="new-variant-quantity_input"
        />

        <VariantImageUploader
          labelProps={{ className: "text-white" }}
          onFileSelect={onFileSelect}
        />

        <div className="grid grid-cols-2 gap-2 sm:w-3/6 sm:grid-cols-3">
          {blobs?.map((blob, key) => (
            <ImageCard
              key={key}
              onRemove={(event) => onRemoveFile(event, key)}
              image={blob}
              imageContainerClassName="flex items-center justify-center h-36"
              imageClassName="max-h-36 p-4"
              showName
            />
          ))}
        </div>

        <div className="flex flex-row space-x-5">
          <Button
            disabled={
              data?.name === "" ||
              data?.quantity === undefined ||
              blobs.length <= 0 ||
              !valid
            }
            type="submit"
            name="variant"
            onClick={onSave}
            data-testid="new-variant-submit_button"
          >
            {es.save}
          </Button>
          <Link
            to={`${ROUTES.PRODUCT.replace(":productId", productId)}`}
            type="button"
            className={classnames(
              "bg-white text-black font-medium",
              "rounded py-1 px-4 shadow",
              "disabled:bg-slate-100 disabled:cursor-not-allowed",
              "disabled:text-slate-300 cursor-pointer"
            )}
            data-testid="new-variant-cancel_button"
          >
            {es.cancel}
          </Link>
        </div>
      </div>
    </div>
  );
}
