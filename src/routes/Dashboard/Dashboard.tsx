import Socks from "assets/socks-solid.svg?react";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center overflow-x-hidden pb-4">
      <div className="w-screen h-11 shadow shadow-slate-100 bg-white flex items-center space-x-2">
        <Socks className="w-5 h-5 ml-2 fill-slate-700" title="calcetas" />
        <p className="font-medium text-slate-700">Don Calcetón</p>
      </div>
      <Outlet />
    </div>
  );
}
