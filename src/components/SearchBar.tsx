import { ChangeEvent } from "react";
import classnames from "classnames";

type Props = {
  onSearch: (search: string) => void;
  placeholder?: string;
};
export default function SearchBar({ onSearch, placeholder = "Buscar" }: Props) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mt-4 w-full flex justify-center items-center">
      <input
        type="search"
        name="search"
        onChange={onChange}
        placeholder={placeholder}
        className={classnames(
          "w-4/5 sm:w-2/4 py-2 px-2",
          "rounded-lg border-slate-400",
          "focus-visible:border-slate-700",
          "border focus-visible:outline-0 focus-visible:outline-slate-500"
        )}
      />
      <i
        className={classnames(
          "fa-solid fa-magnifying-glass",
          "text-slate-700 ml-2"
        )}
      />
    </div>
  );
}
