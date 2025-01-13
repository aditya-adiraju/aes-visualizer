import ShiftRowSlider from "./ShiftRowSlider";
import StateMatrix from "../common/StateMatrix";
import { useState, useRef } from "react";

export default function ShiftRows() {
  const [highlightPair, setHighlightPair] = useState<[number, number]>([0, 0]);
  const [stateMatrix, setStateMatrix] = useState<number[][]>([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]);
  const [shiftingRowIndex, setShiftingRowIndex] = useState<[number, number]>([-1, -1]);
  const inputState = useRef(stateMatrix)
  return (
    <>
      <StateMatrix
        state={stateMatrix}
        shiftingRowPair={shiftingRowIndex}
        heading="Shift Rows"
      />
      <br/>
      <ShiftRowSlider state={stateMatrix} setState={setStateMatrix} inputStateRef={inputState} setShiftingRow={setShiftingRowIndex}/> 
    </>
  );
}
