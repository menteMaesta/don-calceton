import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectWelcome, setLogin, getProducts } from "../welcome/welcome.slice";
import Socks from "../assets/socks-solid.svg?react";

export default function Welcome() {
  const dispatch = useAppDispatch();
  const welcomeValue = useAppSelector(selectWelcome);

  const onLogin = async () => {
    await dispatch(setLogin());
  };

  const onGetProducts = async () => {
    await dispatch(getProducts());
  };

  return (
    <div className="w-screen h-screen bg-violet-600 flex flex-col items-center justify-center">
      <Socks
        className="w-44 h-44 fill-slate-100 mb-4 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_4]"
        title="calcetas"
      />
      <p className="text-3xl font-bold text-white">
        {welcomeValue}
        <span className="text-3xl font-bold text-amber-500 pl-2">
          pronto...
        </span>
      </p>
      <button
        onClick={onLogin}
        className="bg-amber-500 rounded py-1 px-4 mt-2 text-violet-700 font-medium"
      >
        Login
      </button>

      <button
        onClick={onGetProducts}
        className="bg-amber-500 rounded py-1 px-4 mt-2 text-violet-700 font-medium"
      >
        Products
      </button>
    </div>
  );
}
