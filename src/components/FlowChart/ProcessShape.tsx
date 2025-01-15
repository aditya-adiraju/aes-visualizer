export default function ProcessShape({ title, display }: { title: string, display: string }) {
  return (
    <>
      <div className="flex flex-col text-center border-gray-300 border-4 w-52 m-auto align-middle justify-center bg-purple-600 hover:bg-red-600">
        <h3 className="text-white text-xl font-bold p-8">{title}</h3>
      </div>
    </>
  );
}