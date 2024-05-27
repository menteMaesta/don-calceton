import classnames from "classnames";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  title: string;
  className?: string;
};
export default function SticyLink({ to, title, className }: Props) {
  return (
    <Link
      to={to}
      className={classnames(
        "w-36 rounded mt-4",
        "py-2 z-10 text-center",
        "bg-slate-700 text-white",
        "sticky top-12",
        "hover:bg-slate-800",
        className
      )}
    >
      {title}
    </Link>
  );
}
