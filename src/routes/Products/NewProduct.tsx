import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useActionData, useSubmit } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { ProductBase, ErrorType } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import ProductForm from "components/ProductForm";
import { es } from "helpers/strings";

export default function NewProduct() {
  const actionData = useActionData() as ErrorType;
  const submit = useSubmit();
  const [openSnackbar] = useSnackbar();
  const [data, setData] = useState<ProductBase>();

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    } else if (actionData) {
      openSnackbar(actionData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData(
      (prev) =>
        ({ ...prev, [event.target.name]: event.target.value } as ProductBase)
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("products", "create");
    formData.append("name", data?.name || "");
    formData.append("price", `${data?.price}` || "");
    formData.append("wholesalePrice", `${data?.wholesalePrice}` || "");
    formData.append("description", data?.description || "");
    submit(formData, { method: "post" });
  };

  return (
    <div className="mt-11 w-full px-4">
      <p
        className="mt-9 font-semibold text-center text-lg"
        data-testid="product-form-title"
      >
        {es.products.new}
      </p>
      <ProductForm
        data={data}
        onChange={onChange}
        onSubmit={handleSubmit}
        cancelLink={ROUTES.DASHBOARD}
      />
    </div>
  );
}
