import { ChangeEvent, MouseEvent } from "react";
import CustomizationDataEdit from "routes/Customizations/CustomizationDataEdit";
import DeleteButton from "components/DeleteButton";
import { Customization } from "helpers/customTypes";
import { CUSTOMIZATION_SELECTORS } from "helpers/test";

type Props = {
  index: number;
  customization: Customization;
  setCustomizations: (value: React.SetStateAction<Customization[]>) => void;
};
export default function NewCustomizationCard({
  index,
  customization,
  setCustomizations,
}: Props) {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCustomizations((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const handleOnRemove = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCustomizations((prev) => prev.filter((_, i) => `${i}` !== `${index}`));
  };

  return (
    <div
      className={
        "bg-white " +
        "px-2 py-1 pr-8 " +
        "rounded relative " +
        "shadow dark:bg-slate-700 " +
        "dark:text-slate-200"
      }
      data-testid={CUSTOMIZATION_SELECTORS.card.replace("{id}", "")}
    >
      <DeleteButton
        data-testid={CUSTOMIZATION_SELECTORS.remove}
        onClick={handleOnRemove}
      />
      <CustomizationDataEdit
        onChange={handleOnChange}
        data={customization}
        customization={customization}
        isNew={true}
        valid={true}
      />
    </div>
  );
}
