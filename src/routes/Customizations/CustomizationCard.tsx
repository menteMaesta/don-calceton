import { useState, useEffect, Fragment, MouseEvent, ChangeEvent } from "react";
import { Customization } from "helpers/customTypes";
import { es } from "helpers/strings";
import CustomizationDataEdit from "routes/Customizations/CustomizationDataEdit";

type Props = {
  customization: Customization;
  onSaveData: (data: Customization) => void;
  onRemove?: (event: MouseEvent<HTMLElement>, id: string) => void;
  isNew?: boolean;
};

export default function CustomizationCard({
  customization,
  onSaveData,
  onRemove,
  isNew = false,
}: Props) {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<Customization>(customization);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (isNew) {
      setEdit(true);
    }
  }, [isNew]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(
      (prev) =>
        ({ ...prev, [event.target.name]: event.target.value } as Customization)
    );
    if (event.target.name === "minSize" || event.target.name === "maxSize") {
      if (event.target.value.includes("-") || event.target.value.length === 0) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  };

  const onEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setEdit((prev) => !prev);
  };

  const onSave = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (
      data.title !== customization.title ||
      data.minSize !== customization.minSize ||
      data.maxSize !== customization.maxSize
    ) {
      onSaveData(data);
    }
    setEdit(false);
  };

  return (
    <div
      className="bg-white px-2 py-1 pr-24 rounded relative shadow"
      data-testid={`customization_card-${customization.id || ""}`}
    >
      {!isNew && (
        <button
          data-testid="edit-customization"
          onClick={onEdit}
          className={
            "absolute right-9 top-2 " +
            "fa-solid fa-pen " +
            "text-gray-300 " +
            "hover:text-gray-500 active:text-gray-500"
          }
        />
      )}
      {onRemove && (!edit || isNew) && (
        <button
          data-testid="remove-customization"
          onClick={(event) => onRemove(event, `${customization.id}`)}
          className={
            "absolute right-2 top-2 " +
            "fa-solid fa-circle-xmark " +
            "text-gray-300 z-[1] " +
            "hover:text-gray-500 active:text-gray-500"
          }
        />
      )}
      {!edit && (
        <Fragment>
          <p
            className="font-bold"
            data-testid={`title-${customization.id || ""}`}
          >
            {customization.title}
          </p>
          <p data-testid={`min-size-${customization.id || ""}`}>
            {`${es.customizations.imageMin} ${customization.minSize} ${es.customizations.cm}`}
          </p>
          <p data-testid={`max-size-${customization.id || ""}`}>
            {`${es.customizations.imageMax} ${customization.maxSize} ${es.customizations.cm}`}
          </p>
        </Fragment>
      )}
      {edit && (
        <CustomizationDataEdit
          onSave={onSave}
          onChange={onChange}
          data={data}
          customization={customization}
          isNew={isNew}
          valid={valid}
        />
      )}
    </div>
  );
}
