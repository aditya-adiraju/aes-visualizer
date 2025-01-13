import ShiftRowSlider from "./ShiftRowSlider";
import StateMatrix from "../common/StateMatrix";
import { useState, useRef } from "react";
import StepHeading from "../common/StepHeading";

interface ShiftRowsProps {
  inState: number[][]
}

export default function ShiftRows({ inState }: ShiftRowsProps) {
  const [stateMatrix, setStateMatrix] = useState<number[][]>(inState);
  const [shiftingRowIndex, setShiftingRowIndex] = useState<[number, number]>([
    -1, -1,
  ]);
  const inputState = useRef(stateMatrix);
  return (
    <div>
      <StepHeading title="Shift Rows" />
      <StateMatrix
        state={stateMatrix}
        shiftingRowPair={shiftingRowIndex}
        heading="Shift Rows"
      />
      <br />
      <ShiftRowSlider
        state={stateMatrix}
        setState={setStateMatrix}
        inputStateRef={inputState}
        setShiftingRow={setShiftingRowIndex}
      />
    </div>
  );
}
