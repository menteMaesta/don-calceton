import { MouseEvent } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import { CartItem } from "helpers/customTypes";
import VariantImageSlider from "src/storeComponents/VariantImageSlider";

export default function Cart() {
  const cart = useLoaderData() as CartItem[];
  const submit = useSubmit();

  const onRemoveFromCart = (
    event: MouseEvent<HTMLElement>,
    variantId: string
  ) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", `${variantId}`);
    formData.append("store", "removeVariant");
    submit(formData, { method: "post" });
  };

  return (
    <div className="mt-11 flex flex-col w-full px-4" data-testid="cart_page">
      <p className="mt-4 font-bold" data-testid="product_counter">
        <i className={"fa-solid fa-cart-shopping " + "text-xl " + "ml-2"} />
        Productos <span>{cart.length}</span>
      </p>
      <div
        data-testid="cart_list"
        className={
          "mt-8 " +
          "grid grid-cols-1 gap-4 " +
          "sm:grid-cols-1 md:grid-cols-2 " +
          "lg:grid-cols-3 w-full"
        }
      >
        {cart.map((item) => (
          <VariantImageSlider
            key={item.id}
            item={item}
            onRemove={onRemoveFromCart}
          />
        ))}
      </div>
    </div>
  );
}
