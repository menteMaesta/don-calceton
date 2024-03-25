type props = {
  name: string;
};

export default function EmptyState({ name }: props) {
  return (
    <div className="flex flex-col items-center justify-center text-slate-300 mt-28">
      <i className="fa-solid fa-couch text-4xl" />
      No hay {name}
    </div>
  );
}
