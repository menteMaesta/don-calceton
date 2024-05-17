type Props = {
  title: string;
  children?: React.ReactNode;
};

export default function FormItem({ title, children }: Props) {
  return (
    <label className="flex flex-wrap sm:flex-nowrap items-start justify-between mb-2">
      <span>{title}: </span>
      <div className="relative sm:w-9/12 w-full">{children}</div>
    </label>
  );
}
