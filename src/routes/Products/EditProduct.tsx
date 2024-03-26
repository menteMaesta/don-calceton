import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useActionData, useSubmit, useLoaderData } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { Product, ErrorType } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import ProductForm from "components/ProductForm";

export default function EditProduct() {
  const actionData = useActionData() as ErrorType;
  const product = useLoaderData() as Product;
  const submit = useSubmit();
  const [openSnackbar] = useSnackbar();
  const [data, setData] = useState<Product>(product);

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    } else if (actionData) {
      openSnackbar(actionData);
    }
  }, [actionData]);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData(
      (prev) =>
        ({ ...prev, [event.target.name]: event.target.value } as Product)
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("products", "editProduct");
    formData.append("name", data?.name || "");
    formData.append("price", `${data?.price}` || "");
    formData.append("description", data?.description || "");
    formData.append("productId", `${data?.id}` || "");
    submit(formData, { method: "post" });
  };

  return (
    <div className="mt-11 w-full px-4">
      <p className="mt-9 font-semibold text-center text-lg">Editar producto</p>
      <ProductForm
        data={data}
        onChange={onChange}
        onSubmit={handleSubmit}
        cancelLink={ROUTES.PRODUCT.replace(":productId", `${product.id}`)}
      />
    </div>
  );
}