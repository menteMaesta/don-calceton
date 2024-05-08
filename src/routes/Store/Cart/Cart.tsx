import { useLoaderData } from "react-router-dom";
import { CartItem } from "helpers/customTypes";
import VariantImageSlider from "src/storeComponents/VariantImageSlider";

export default function Cart() {
  const cart = useLoaderData() as CartItem[];

  return (
    <div className="mt-11 flex flex-col w-full px-4">
      <p className="mt-4 font-bold">
        <i className={"fa-solid fa-cart-shopping " + "text-xl " + "ml-2"} />
        Productos <span>{cart.length}</span>
      </p>
      <div
        className={
          "mt-8 " +
          "grid grid-cols-1 gap-4 " +
          "sm:grid-cols-1 md:grid-cols-2 " +
          "lg:grid-cols-3 w-full"
        }
      >
        {cart.map((item) => (
          <VariantImageSlider key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
