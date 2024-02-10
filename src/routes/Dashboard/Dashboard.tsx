import Socks from "assets/socks-solid.svg?react";

export default function Dashboard() {
  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center overflow-hidden">
      <Socks className="w-44 h-44 fill-slate-700 mb-4 mt-40" title="calcetas" />
      <p className="text-3xl font-bold text-slate-600">Don Calcetón</p>
      {/* use Outlet */}
    </div>
  );
}
