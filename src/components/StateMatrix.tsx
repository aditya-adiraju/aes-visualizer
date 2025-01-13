import { Dispatch, SetStateAction } from "react";

type Pair<T> = [T, T];
interface StateMatrixProps {
  heading: string;
  state: number[][];
  highlight?: Pair<number>;
  setHighlight:
    | Dispatch<SetStateAction<Pair<number>>>
    | ((_: [number, number]) => void);
}

export default function StateMatrix({
  heading,
  state,
  highlight = [-1, -1],
  setHighlight,
}: StateMatrixProps) {
  return (
    <div className="text-center">
      <h2 className="font-bold text-2xl p-2"> {heading} </h2>
      <table className="border-separate border-spacing-1">
        {state.map((row, i) => (
          <tr key={i}>
            {" "}
            {row.map((val, j) => (
              <td
                className={
                  "w-10 h-10 text-xl font-bold " +
                  (highlight[0] === i && highlight[1] === j
                    ? "bg-purple-600"
                    : "bg-blue-600")
                }
                onMouseOver={() => setHighlight([i, j])}
                key={`${i * state.length + j} stateArray`}
              >
                {val.toString(16).toUpperCase().padStart(2, "0")}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
