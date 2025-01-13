import { MathJax } from "better-react-mathjax";

const arrayToLatexMatrix = (array: number[][]) => {
  const rows = array.map((row) => row.map((val) => `\\texttt{${val.toString(16).padStart(2, '0')}}` ).join(" & ")).join(" \\\\ ");
  return `\\begin{bmatrix}${rows}\\end{bmatrix}`;
};

export default function FixedMatrix({
  fixedMatrix,
}: {
  fixedMatrix: number[][];
}) {
  return (
    <div className="scale-150">
      <h2 className="text-lg font-bold">Fixed Matrix</h2>
      <MathJax>{arrayToLatexMatrix(fixedMatrix)}</MathJax>
    </div>
  );
}
