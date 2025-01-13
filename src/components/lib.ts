
export const splitByte = (x: number): [number, number] => [(x >> 4) % 16,  x % 16];

export function subBytesMatrix(state: number[][], sbox: number[][]): number[][] {
  return state.map((row) =>  row.map((val) => sbox[splitByte(val)[0]][splitByte(val)[1]]));
}

// technically different from the shiftRows used in the component since that's too coupled with component
export function shiftRows(state: number[][]): number[][] {
    return state.map((row, i) =>  [...row.slice(i), ...row.slice(0, i)])
}

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

export function mixColumnOperation(
  inputState: number[][],
  fixedMatrix: number[][]
): number[][] {
  return transpose(
    fixedMatrix.map((_, i) =>
      GFMatrixMul(fixedMatrix, getColumn(inputState, i))
    )
  );
}