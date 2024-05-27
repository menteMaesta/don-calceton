type Props = {
  section: string;
};
export default function SectionDivider({ section }: Props) {
  return (
    <div className="w-full flex items-center pt-8 relative">
      <p
        data-testid="section-divider"
        className={
          "text-gray-300 " +
          "absolute font-light " +
          "flex items-center justify-center " +
          "w-full"
        }
      >
        <span className="bg-slate-50 px-3">{section}</span>
      </p>
      <div className="w-full border-b-2 border-slate-100" />
    </div>
  );
}
