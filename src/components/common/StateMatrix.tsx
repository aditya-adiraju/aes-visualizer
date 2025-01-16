import { Dispatch, SetStateAction } from "react";

import "./StateMatrix.css";

type Pair<T> = [T, T];
interface StateMatrixProps {
  heading: string;
  state: number[][];
  highlight?: Pair<number>;
  setHighlight?:
    | Dispatch<SetStateAction<Pair<number>>>
    | ((_: [number, number]) => void);

  shiftingRowPair?: Pair<number>;
  isKey?: boolean;
}

function getTranslateX(pivot: number, index: number, size: number): string {
  // 0 1 2 3 -> 0 1 2 3 pivot = 0
  // 0 1 2 3 -> 1 2 3 0 pivot = 1 (size = 4 - 1)
  // 0 1 2 3 -> 2 3 0 1 pivot = 2 (size = 4 - 2)
  // 0 1 2 3 -> 3 0 1 2 pivot = 3
  let translationFactor = 0;
  if (index < pivot) {
    // translate right
    translationFactor = size - pivot;
  } else {
    // translate left
    translationFactor = -1 * pivot;
  }

  return `${translationFactor * 110}%`;
}

export default function StateMatrix({
  heading,
  state,
  highlight = [-1, -1],
  setHighlight = (_) => {},
  shiftingRowPair = [-1, -1],
  isKey = false,
}: StateMatrixProps) {
  return (
    <div className="text-center justify-items-center">
      <h2 className="font-bold text-2xl p-2"> {heading} </h2>
      <table className="border-separate border-spacing-1">
        <tbody>
          {state.map((row, i) => (
            <tr key={i}>
              {row.map((val, j) => (
                <td
                  className={
                    "relative w-10 h-10 text-xl font-bold hover:scale-125 " +
                    (shiftingRowPair[0] == i ? "shifting-left " : "") +
                    (highlight[0] === i && highlight[1] === j
                      ? isKey
                      ? " bg-violet-600 "
                        : " bg-purple-600"
                      : isKey
                        ? " bg-red-600 "
                      : " bg-blue-600")
                  }
                  //{"--translate": (shiftingRowPair[0] === i ? getTranslateX(shiftingRowPair[1], j, row.length) : "0px")
                  style={
                    shiftingRowPair[0] === i
                      ? ({
                          "--transform": getTranslateX(
                            shiftingRowPair[1],
                            j,
                            row.length
                          ),
                        } as React.CSSProperties)
                      : ({} as React.CSSProperties)
                  }
                  onMouseOver={() => setHighlight([i, j])}
                  key={`${i * state.length + j} stateArray`}
                >
                  {val.toString(16).toUpperCase().padStart(2, "0")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
