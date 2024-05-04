import { useLoaderData } from "react-router-dom";
import { VariantListItem } from "helpers/customTypes";

export default function Cart() {
  const { cart } = useLoaderData() as { cart: VariantListItem[] };

  return (
    <div className="mt-11 flex flex-col w-full px-4">
      <p className="mt-4 font-bold">
        <i className={"fa-solid fa-cart-shopping " + "text-xl " + "ml-2"} />
        Productos <span>{cart.length}</span>
      </p>
      <div className="mt-8 flex flex-col space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded">
            <p>{item.name}</p>
            <p>
              Cantidad <span>{item.orderQuantity}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
