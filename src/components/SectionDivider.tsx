import classnames from "classnames";

type Props = {
  section: string;
};
export default function SectionDivider({ section }: Props) {
  return (
    <div className="w-full flex items-center pt-8 relative">
      <p
        className={classnames(
          "text-gray-300 bg-slate-50",
          "font-light px-3",
          "absolute",
          "sm:start-1/2",
          "start-[38%]"
        )}
      >
        {section}
      </p>
      <div className="w-full border-b-2 border-slate-100" />
    </div>
  );
}
