import { TabPanel } from "@reach/tabs";
import { es } from "helpers/strings";
import { NewVariantType } from "helpers/customTypes";
import { PRODUCT_PAGE, VARIANT_SELECTORS } from "helpers/test";
import EmptyState from "components/EmptyState";
import Button from "components/Button";
import NewVariantCard from "components/NewVariantCard";

type Props = {
  variants: NewVariantType[];
  setVariants: (value: React.SetStateAction<NewVariantType[]>) => void;
};

export default function NewVariantsTab({ variants, setVariants }: Props) {
  return (
    <TabPanel as="section" data-testid={PRODUCT_PAGE.variantTabPanel}>
      <div className="relative flex flex-col items-center w-full">
        <Button
          data-testid={VARIANT_SELECTORS.newVariant}
          className={"!p-2 bg-slate-700 mt-4 " + "sticky top-12 z-10 "}
          onClick={() =>
            setVariants((prev) => [
              ...prev,
              { name: "", quantity: "", images: [] },
            ])
          }
        >
          {es.variants.new}
        </Button>
        {variants.length > 0 ? (
          <div
            className={
              "grid grid-cols-1 gap-4 " +
              "sm:grid-cols-2 md:grid-cols-3 " +
              "lg:grid-cols-4 w-full " +
              "mt-7 px-4"
            }
            data-testid={PRODUCT_PAGE.variantList}
          >
            {variants.map((variant, index) => (
              <NewVariantCard
                key={index}
                variant={variant}
                index={index}
                setVariants={setVariants}
              />
            ))}
          </div>
        ) : (
          <EmptyState name={es.variants.name} />
        )}
      </div>
    </TabPanel>
  );
}
