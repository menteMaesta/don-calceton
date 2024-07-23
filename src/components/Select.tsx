import ReactSelect, { GroupBase, Props } from "react-select";

export default function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(other: Props<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      classNames={{
        singleValue: () => "dark:!text-slate-200",
        control: () =>
          "border " +
          "dark:!bg-slate-900 dark:!border-slate-900 " +
          "dark:!shadow-none dark:hover:!border-slate-500 " +
          "dark:focus-within:!border-slate-500",
        menu: () =>
          "dark:!bg-slate-800 !z-50 " +
          "dark:!border " +
          "dark:!border-slate-500 " +
          "dark:!text-slate-300",
        option: ({ isFocused, isSelected }) =>
          isFocused
            ? "dark:!bg-slate-700 "
            : "dark:hover:!bg-slate-700 " +
              (isSelected ? "dark:!bg-slate-900" : ""),
        placeholder: () => "dark:!text-slate-600",
        multiValue: () => "dark:!bg-slate-700",
        multiValueLabel: () => "dark:!text-slate-300",
        multiValueRemove: () => "dark:!text-slate-300 dark:hover:!bg-red-900",
      }}
      {...other}
    />
  );
}
