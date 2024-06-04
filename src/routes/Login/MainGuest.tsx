import { Outlet } from "react-router-dom";

export default function MainGuest() {
  return (
    <div
      className={
        "w-screen h-screen " +
        "bg-slate-50 flex " +
        "flex-col items-center " +
        "overflow-hidden " +
        "dark:bg-slate-800"
      }
    >
      {<Outlet />}
    </div>
  );
}
