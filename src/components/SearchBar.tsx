import { ChangeEvent } from "react";
import { es } from "helpers/strings";

type Props = {
  onSearch: (search: string) => void;
  placeholder?: string;
};
export default function SearchBar({
  onSearch,
  placeholder = es.search,
}: Props) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mt-4 w-full flex justify-center items-center">
      <input
        data-testid="search-bar"
        type="search"
        name="search"
        onChange={onChange}
        placeholder={placeholder}
        className={
          "w-4/5 sm:w-2/4 py-2 px-2 " +
          "rounded-lg border-slate-400 " +
          "focus-visible:border-slate-700 " +
          "border focus-visible:outline-0 " +
          "focus-visible:outline-slate-500 " +
          "dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
        }
      />
      <i
        className={
          "fa-solid fa-magnifying-glass " +
          "text-slate-700 ml-2 " +
          "dark:text-slate-300"
        }
      />
    </div>
  );
}
