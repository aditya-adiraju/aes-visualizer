export default function ProcessShape({ title }: { title: string }) {
  return (
    <>
      <div className="flex flex-col text-center border-gray-300 border-4 w-52 m-auto align-middle justify-center bg-purple-600">
        <h3 className="text-white text-4xl font-bold p-8">{title}</h3>
      </div>
    </>
  );
}