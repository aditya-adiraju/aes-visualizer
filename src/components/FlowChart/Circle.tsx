export default function Circle({ title }: { title: string }) {
  return (
    <>
      <div className="flex flex-col text-center rounded-full  border-gray-300 border-8 h-52 w-52 m-auto align-middle justify-center bg-purple-600">
        <h3 className="text-white text-4xl font-bold">{title}</h3>
      </div>
    </>
  );
}
