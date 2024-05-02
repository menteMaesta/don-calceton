import classnames from "classnames";

type Props = {
  id: number;
  price: number;
  wholesalePrice: number;
};
export default function ProductCard({ id, price, wholesalePrice }: Props) {
  return (
    <div
      className={classnames(
        "absolute bottom-0 right-0",
        "flex flex-col items-end"
      )}
    >
      <p
        className={classnames(
          "bg-slate-950 text-white",
          "w-fit sm:text-sm",
          "rounded-full px-2"
        )}
        data-testid={`price_${id}`}
      >
        <span>Base $</span>
        {price}
        <span> MXN</span>
      </p>
      <p
        className={classnames(
          "bg-slate-950 text-white",
          "w-fit mt-1 sm:text-sm",
          "rounded-full px-2"
        )}
        data-testid={`wholesale-price_${id}`}
      >
        <span>Mayoreo $</span>
        {wholesalePrice}
        <span> MXN</span>
      </p>
    </div>
  );
}
