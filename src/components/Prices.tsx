import { es } from "helpers/strings";

type Props = {
  id: number;
  price: number;
  wholesalePrice: number;
  className?: string;
};
export default function ProductCard({
  id,
  price,
  wholesalePrice,
  className,
}: Props) {
  return (
    <div className={"flex flex-col " + className}>
      <p
        className={
          "bg-slate-950 text-white " +
          "w-fit sm:text-sm " +
          "rounded-full px-2 " +
          "dark:bg-slate-500"
        }
        data-testid={`price_${id}`}
      >
        <span>{es.products.base}</span>
        {price}
        <span> {es.mxn}</span>
      </p>
      <p
        className={
          "bg-slate-950 text-white " +
          "w-fit mt-1 sm:text-sm " +
          "rounded-full px-2 " +
          "dark:bg-slate-500"
        }
        data-testid={`wholesale-price_${id}`}
      >
        <span>{es.products.wholesalePrice}</span>
        {wholesalePrice}
        <span> {es.mxn}</span>
      </p>
    </div>
  );
}
