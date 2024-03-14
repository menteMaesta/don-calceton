type Props = {
  section: string;
};
export default function SectionDivider({ section }: Props) {
  return (
    <div className="w-full flex items-center pt-8 relative">
      <div className="w-5/12 border-b-2 border-gray-100" />
      <p className="text-gray-300 font-light px-4">{section}</p>
      <div className="w-5/12 border-b-2 border-gray-100" />
    </div>
  );
}
