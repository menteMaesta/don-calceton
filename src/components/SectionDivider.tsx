type Props = {
  section: string;
};
export default function SectionDivider({ section }: Props) {
  return (
    <div className="w-full flex items-center justify-center pt-8 relative">
      <p className="bg-slate-50 text-gray-300 font-light z-10 px-4">
        {section}
      </p>
      <div className="w-full border-b-2 border-gray-100 absolute z-0" />
    </div>
  );
}
