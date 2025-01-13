import { useState } from "react";
import StateMatrix from "../common/StateMatrix";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import FixedMatrix from "./FixedMatrix";

// multiply two numbers in GF(2^8)
function GFMul(x: number, y: number): number {
  let mask: number = 1;
  let sum: number = 0;
  for (let power = 0; power < 8; power++) {
    const bit: boolean = (y & mask) > 0;
    if (bit) {
      sum = sum ^ (x << power);
    }
    mask = mask << 1;
  }
  return (sum > 255 ? sum ^ 0x11b : sum) & 0xff;
}

// multiply nxn matrix with n-vector in GF(2^8).  function GFMatrixMul(matrix: number[][], vector: number[]): number[] {
function GFMatrixMul(matrix: number[][], vector: number[]): number[] {
  if (!matrix[0] || vector.length != matrix[0].length) {
    console.log("Size mismatch/empty matrix row");
  }

  return matrix.map((row) =>
    row
      .map((value, j) => GFMul(value, vector[j]))
      .reduce((acc, val) => acc ^ val, 0)
  );
}

function getColumn(mat: number[][], i: number): number[] {
  return mat.map((row) => row[i]);
}

const transpose = (matrix: number[][]): number[][] =>
  matrix[0].map((_, i) => matrix.map((row) => row[i]));

function mixColumnOperation(
  inputState: number[][],
  fixedMatrix: number[][]
): number[][] {
  return transpose(
    fixedMatrix.map((_, i) =>
      GFMatrixMul(fixedMatrix, getColumn(inputState, i))
    )
  );
}

export default function MixColumns() {
  const [highlightPair, setHighlightPair] = useState<[number, number]>([0, 0]);
  const inState: number[][] = [
    [0x63, 0xeb, 0x9f, 0xa0],
    [0x2f, 0x93, 0x92, 0xc0],
    [0xaf, 0xc7, 0xab, 0x30],
    [0xa2, 0x20, 0xcb, 0x2b],
  ];

  const fixedMatrix: number[][] = [
    [0x2, 0x3, 0x1, 0x1],
    [0x1, 0x2, 0x3, 0x1],
    [0x1, 0x1, 0x2, 0x3],
    [0x3, 0x1, 0x1, 0x2],
  ];

  return (
    <>
    <h1 className="font-bold">Mix Columns</h1>
    <br />
    <br />
    <br />
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
