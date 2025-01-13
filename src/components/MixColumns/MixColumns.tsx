import { useState } from "react";
import StateMatrix from "../common/StateMatrix";
import FixedMatrix from "./FixedMatrix";
import StepHeading from "../common/StepHeading";
import { mixColumnOperation } from "../lib";

interface MixColumnsProps {
  inState: number[][];
  fixedMatrix: number[][];
}
export default function MixColumns({inState,  fixedMatrix}: MixColumnsProps) {
  const [highlightPair, setHighlightPair] = useState<[number, number]>([0, 0]);
  return (
    <>
      <StepHeading title="Mix Columns" />
      <div className="grid grid-cols-5 align justify-items-center items-center">
        <StateMatrix
          heading="Input State"
          state={inState}
          highlight={highlightPair}
          setHighlight={setHighlightPair}
        />
        <h2 className="text-5xl font-bold text-center">{"-->"}</h2>
        <FixedMatrix fixedMatrix={fixedMatrix} />
        <h2 className="text-5xl justify-center">{"-->"}</h2>
        <StateMatrix
          state={mixColumnOperation(inState, fixedMatrix)}
          heading="Output State"
          highlight={highlightPair}
          setHighlight={setHighlightPair}
        />
      </div>
    </>
  );
}
