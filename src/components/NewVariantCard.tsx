import { DragEvent, ChangeEvent, Fragment, useState } from "react";
import { es } from "helpers/strings";
import { Blob } from "helpers/customTypes";
import ElementCard from "components/ElementCard";
import TitleInput from "components/TitleInput";
import Input from "components/Input";
import SliderImage from "components/SliderImage";
import VariantImageUploader from "components/VariantImageUploader";
import DragDropImageUploader from "components/DragDropImageUploader";

export default function NewVariantCard() {
  const [blobs, setBlobs] = useState<(Blob & { id: number })[]>([]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const previews = [];
    const files = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        previews.push({
          id: i,
          src: URL.createObjectURL(files[i]),
          name: files[i].name,
          file: files[i],
        });
      }
    }
    setBlobs(previews);
  };

  const handleDropFile = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const previews = [];
    const items = event.dataTransfer.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          previews.push({
            id: i,
            src: URL.createObjectURL(file),
            name: file.name,
            file,
          });
        }
      }
    }
    setBlobs(previews);
  };

  return (
    <ElementCard
      elementId={"1"} // TODO: Add a unique id
      title={
        <TitleInput
          name="name"
          placeholder={es.variants.namePlaceholder}
          value={""}
          onChange={() => {}}
          className="!w-11/12 rounded-lg text-2xl mb-2"
        />
      }
      footer={
        <Fragment>
          {blobs.length > 0 && (
            <VariantImageUploader
              title={es.variants.changeImages}
              className="w-full text-center text-white"
              labelProps={{ className: "w-full dark:bg-slate-800 my-2" }}
              onFileSelect={handleFileSelect}
            />
          )}
          <Input
            label={es.variants.stock}
            type="number"
            name="price"
            placeholder={es.variants.stockPlaceholder}
            className={"rounded-b rounded-t " + "pr-1 pl-1 " + "pt-0 pb-0"}
            value={""}
            onChange={() => {}}
            labelClassName="font-semibold"
          />
        </Fragment>
      }
      type={"variant"}
      onRemove={() => {}}
    >
      {blobs.length === 0 && (
        <DragDropImageUploader
          onFileSelect={handleFileSelect}
          onDropFile={handleDropFile}
        />
      )}
      {blobs.length > 0 && <SliderImage images={blobs} type="variant" />}
    </ElementCard>
  );
}
