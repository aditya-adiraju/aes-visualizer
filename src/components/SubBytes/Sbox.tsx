type Pair<T> = [T, T];
interface SboxProps {
  matrix: number[][];
  highlight?: Pair<number>;
}

export default function SBox ({ matrix, highlight = [-1, -1]}: SboxProps) {
  return (
    <div className="text-center">
      <h2 className="font-bold text-4xl p-2">S-Box</h2>
    <table className="border-separate">
      {matrix.map((row, i) => (
        <tr key={i}> {row.map((val, j) => (
            <td className={"transition-colors motion-reduce:transition-none hover:scale-125 " + (highlight[0] === i  || highlight[1] === j ? 'bg-green-800' : 'bg-green-600')}
                key={i * matrix.length + j}>
                <div className="text-md font-bold p-[0.1 rem]">
                  {val.toString(16).toUpperCase().padStart(2, '0')}
                </div>
              </td>
          ))}
        </tr>
      ))}
    </table>
    </div>
  );
}
