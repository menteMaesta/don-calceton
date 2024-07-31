import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function BottomBar({ children }: Props) {
  return (
    <div
      className={
        "bg-white border-t" +
        " h-10 shadow-2xl" +
        " w-screen absolute" +
        " bottom-0 left-0" +
        " flex justify-between items-center" +
        " px-4 z-[1]" +
        " dark:bg-slate-900 dark:border-slate-950"
      }
      data-testid="bottom-bar-container"
    >
      {children}
    </div>
  );
}
