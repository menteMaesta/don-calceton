type Props = {
  title: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLLabelElement>;

export default function FormItem({ title, children, ...otherProps }: Props) {
  return (
    <label
      className="flex flex-wrap sm:flex-nowrap items-start justify-between mb-2"
      {...otherProps}
    >
      <span data-testid="form-item_label-title">{title}: </span>
      {children && (
        <div
          className="relative sm:w-9/12 w-full"
          data-testid="form-item_label-children"
        >
          {children}
        </div>
      )}
    </label>
  );
}
