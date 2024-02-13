import classnames from "classnames";

export default function SearchBar() {
  return (
    <div className="mt-4 w-full flex justify-center items-center">
      <input
        name="search"
        placeholder="Buscar producto"
        className={classnames(
          "w-4/5 sm:w-2/4 py-2 px-2",
          "rounded-lg border-slate-400",
          "border focus-visible:outline-1 focus-visible:outline-slate-500"
        )}
      />
      <button
        className={classnames(
          "bg-slate-600",
          "px-3 py-2 ml-2",
          "rounded-full",
          "hover:bg-slate-700 active:bg-slate-800"
        )}
      >
        <i className="fa-solid fa-magnifying-glass text-white" />
      </button>
    </div>
  );
}
