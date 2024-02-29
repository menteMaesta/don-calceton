import { useRouteError } from "react-router-dom";
import Ghost from "../assets/ghost-solid.svg?react";
import { ErrorType } from "helpers/customTypes";

export default function ErrorPage() {
  const error = useRouteError() as ErrorType;
  console.error(error);

  return (
    <div className="w-screen h-screen bg-violet-600 flex items-center justify-center flex-col overflow-hidden">
      <Ghost
        className="w-44 h-44 fill-slate-100 mb-4 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_4]"
        title="fantasma error"
      />
      <h1 className="text-5xl font-bold text-amber-500 mb-2">¡Error!</h1>
      <p className="text-xl font-medium text-black">
        Algo inesperado ha ocurrido
      </p>
      <p className="text-xl font-medium text-black">
        Intenta navegar al inicio
      </p>
      <p className="text-lg text-black">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
