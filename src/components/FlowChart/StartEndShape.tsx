export default function StartEndShape({ title, display }: { title: string, display: string}) {
  return (
    <>
      <div className="flex flex-col text-center rounded-full  border-gray-300 border-4 h-20  m-auto align-middle justify-center bg-purple-600 hover:bg-green-500">
        <h3 className="text-white text-3xl font-bold">{title}</h3>
      </div>
    </>
  );
}
