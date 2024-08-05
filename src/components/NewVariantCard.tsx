import { DragEvent, ChangeEvent, Fragment, useState } from "react";
import { es } from "helpers/strings";
import { Blob } from "helpers/customTypes";
import ElementCard from "components/ElementCard";
import TitleInput from "components/TitleInput";
import Input from "components/Input";
import SliderImage from "components/SliderImage";
import DefaultPic from "assets/default-pic.png";

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

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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
          className="w-11/12 rounded-lg text-2xl mr-5 mb-2"
        />
      }
      footer={
        <Fragment>
          {blobs.length > 0 && (
            <label
              className={
                "bg-slate-700 text-center " +
                "w-full p-2 " +
                "rounded text-white"
              }
            >
              {es.variants.changeImages}
              <input
                className="opacity-0 w-0 h-0 absolute -top-1"
                type="file"
                name="images"
                accept=".jpg, .jpeg, .png"
                multiple
                onChange={handleFileSelect}
              />
            </label>
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
        <div
          onDrop={handleDropFile}
          onDragOver={handleDragOver}
          className={
            "w-full flex flex-col " +
            "items-center justify-center " +
            "relative"
          }
        >
          <img className={"max-h-60"} alt={"default image"} src={DefaultPic} />
          <div className="absolute text-center">
            <label className="text-gray-500 font-bold">
              {es.variants.browseImages}
              <input
                className="opacity-0 w-0 h-0 absolute -top-1"
                type="file"
                name="images"
                accept=".jpg, .jpeg, .png"
                multiple
                onChange={handleFileSelect}
              />
            </label>
            <p className="text-gray-500">{es.variants.dragImages}</p>
          </div>
        </div>
      )}
      {blobs.length > 0 && <SliderImage images={blobs} type="variant" />}
    </ElementCard>
  );
}
