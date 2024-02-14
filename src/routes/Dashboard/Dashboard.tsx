import Socks from "assets/socks-solid.svg?react";
import { Outlet } from "react-router-dom";
import classnames from "classnames";

export default function Dashboard() {
  return (
    <div
      className={classnames(
        "w-screen h-screen",
        "bg-slate-50 overflow-x-hidden",
        "flex flex-col",
        "items-center pb-4"
      )}
    >
      <div
        className={classnames(
          "w-screen h-11",
          "shadow shadow-slate-100 bg-white",
          "flex items-center space-x-2",
          "absolute top-0 z-10"
        )}
      >
        <Socks className="w-5 h-5 ml-2 fill-slate-700" title="calcetas" />
        <p className="font-medium text-slate-700">Don Calcetón</p>
      </div>

      <Outlet />
    </div>
  );
}
