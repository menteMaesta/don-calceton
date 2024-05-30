import { MouseEvent } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import { CartItemType } from "helpers/customTypes";
import CartItem from "storeComponents/CartItem";
import EmptyState from "components/EmptyState";

export default function Cart() {
  const { cart, totalPrice } = useLoaderData() as {
    cart: CartItemType[];
    totalPrice: number;
  };
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
      <p className="mt-4 font-bold" data-testid="total-product_price">
        <i className={"fa-solid fa-cart-shopping " + "text-xl " + "mr-2"} />
        Precio total $<span>{totalPrice}</span>
      </p>
      {cart.length > 0 ? (
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
            <CartItem key={item.id} item={item} onRemove={onRemoveFromCart} />
          ))}
        </div>
      ) : (
        <EmptyState name="productos" />
      )}
    </div>
  );
}
