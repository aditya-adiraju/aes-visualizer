/**
 *
 */
import assert from "node:assert";

/**
 *
 * @param bytes A 16 element array of bytes to convert to a 2D State Array
 * @description The State Array is filled by columns first. State = [[b[0], b[4], b[8], b[12]],... [b[3], b[7], b[11], b[15]]] where b is bytes array.
 * @returns A 4x4 State Array.
 */
export function bytesToState(bytes: number[]): number[][] {
  assert.ok(bytes.length == 16, "Bytes must be 16 elements long.");
  bytes.map((b) =>
    assert.ok(
      b >= 0 && b <= 0xff,
      "all bytes in provided list must be between 0 and 255"
    )
  );

  const state = [];
  for (let i = 0; i < bytes.length; i += 4) state.push(bytes.slice(i, i + 4));

  return state;
}

/**
 *
 * @param state A 4x4 State Array.
 * @description The function traverses columns up-down then left-right on the state
 * @returns a 16 element array of bytes
 */
export function stateToBytes(state: number[][]): number[] {
  assert.ok(state.length == 4, "State must be a 4x4 array of bytes.");

  state.map((row) => {
    assert.ok(row.length == 4, "State must be a 4x4 array of bytes.");
    row.map((b) => {
      assert.ok(
        b >= 0 && b <= 0xff,
        "all bytes in provided list must be between 0 and 255"
      );
    });
  });

  const bytes = [];
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      bytes.push(state[j][i]);
    }
  }

  return bytes;
}
