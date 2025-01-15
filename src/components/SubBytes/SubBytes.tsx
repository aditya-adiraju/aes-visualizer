import { useState } from "react";
import SBox from "./Sbox";
import StateMatrix from "../common/StateMatrix";
import StepHeading from "../common/StepHeading";
import { splitByte, subBytesMatrix } from "../lib";

interface SubBytesProps {
  inState: number[][];
  sbox: number[][];
}

export default function SubBytes({ inState, sbox }: SubBytesProps) {
  const [highlightPair, setHighlightPair] = useState<[number, number]>([0, 0]);
  return (
    <>
      <StepHeading title="Sub Bytes" />
      <div className="flex items-center justify-items-center gap-10">
        <div className="">
          <StateMatrix
            heading="Input State"
            state={inState}
            highlight={highlightPair}
            setHighlight={setHighlightPair}
          />
        </div>
        <div className="min-w-0 max-w-full">
          <SBox
            matrix={sbox}
            highlight={splitByte(inState[highlightPair[0]][highlightPair[1]])}
          />
        </div>
        <div className="">
          <StateMatrix
            heading="Output State"
            state={subBytesMatrix(inState, sbox)}
            highlight={highlightPair}
            setHighlight={setHighlightPair}
          />
        </div>
      </div>
    </>
  );
}
