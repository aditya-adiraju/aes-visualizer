import { MathJax } from "better-react-mathjax";
import StateMatrix from "../common/StateMatrix";
import { useState } from "react";
import { xorKey } from "../lib";
import StepHeading from "../common/StepHeading";

interface XorRoundKeyProps {
  inState: number[][];
  roundKey: number[][];
}

export default function XorRoundKey({ inState, roundKey }: XorRoundKeyProps) {
  const [highlightPair, setHighlightPair] = useState<[number, number]>([0, 0]);
  return (
    <>
    <StepHeading title={"XOR Round Key"}/>
    <div className="grid grid-cols-[2fr_0.5fr_2fr_0.5fr_2fr] align justify-items-center items-center">
      <StateMatrix
        state={inState}
        highlight={highlightPair}
        setHighlight={setHighlightPair}
        heading="Input State"
      />

      <div className="scale-[400%]">
        <MathJax>{"\\(\\oplus\\)"}</MathJax>
      </div>

      <StateMatrix
        isKey={true}
        state={roundKey}
        highlight={highlightPair}
        setHighlight={setHighlightPair}
        heading="Round Key"
      />
      <div className="scale-[400%]">
       =
      </div>
      <StateMatrix
        state={xorKey(inState, roundKey)}
        highlight={highlightPair}
        setHighlight={setHighlightPair}
        heading="Output State"
      />
    </div>
    </>
  );
}
