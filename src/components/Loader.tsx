import DinoSvg from "components/DinoSvg/DinoSvg";
import { es } from "helpers/strings";

type Props = { className?: string };

export default function Loader({ className }: Props) {
  return (
    <div
      className={
        "w-screen h-screen " +
        "flex items-center flex-col " +
        "justify-center overflow-hidden " +
        className
      }
      data-testid="loader"
    >
      <DinoSvg className="dino w-32" />
      <p
        className={
          "text-lg text-slate-400 " +
          "font-light animate-pulse " +
          "tracking-wide dark:text-slate-400 "
        }
      >
        {es.loading}
      </p>
    </div>
  );
}
