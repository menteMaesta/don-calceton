type Props = { className?: string };

export default function Loader({ className }: Props) {
  return (
    <div
      className={
        "w-screen h-screen " +
        "flex items-center " +
        "justify-center overflow-hidden " +
        className
      }
      data-testid="loader"
    >
      <i
        className={
          "fa-solid fa-rotate-right " +
          "text-3xl motion-safe:animate-spin " +
          "text-slate-400"
        }
      />
    </div>
  );
}
