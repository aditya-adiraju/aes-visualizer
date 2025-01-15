import { motion } from "motion/react";
import { Children, useState } from "react";
import { mixColumnOperation, shiftRows, subBytesMatrix, xorKey, sbox } from "../lib";
import MixColumns from "../MixColumns/MixColumns";
import ShiftRows from "../ShiftRows/ShiftRows";
import SubBytes from "../SubBytes/SubBytes";
import XorRoundKey from "../XorRoundKey/XorRoundKey";

const fixedMatrix: number[][] = [
  [0x2, 0x3, 0x1, 0x1],
  [0x1, 0x2, 0x3, 0x1],
  [0x1, 0x1, 0x2, 0x3],
  [0x3, 0x1, 0x1, 0x2],
];


export default function FlowChart({ children }) {
  const [display, setDisplay] = useState<string>("");

  const [inState, setInState] = useState<number[][]>(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 1024) & 0xff)
    )
  );

  const [roundKey, setRoundKey] = useState<number[][]>(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 1024) & 0xff)
    )
  );

  function getDisplay() {
    switch (display) {
      case "SubBytes":
        return <SubBytes inState={inState} sbox={sbox} />;
      case "ShiftRows":
        return <ShiftRows inState={subBytesMatrix(inState, sbox)} />;
      case "MixColumns":
        return (
          <MixColumns
            inState={shiftRows(subBytesMatrix(inState, sbox))}
            fixedMatrix={fixedMatrix}
          />
        );
      case "XorRoundKey":
        return (
          <XorRoundKey
            inState={mixColumnOperation(
              shiftRows(subBytesMatrix(inState, sbox)),
              fixedMatrix
            )}
            roundKey={roundKey}
          />
        );
      case "NextRound":
        return <></>;
      default:
        return <></>;
    }
  }

  function clickHandler(d: string) {
    if (d === "NextRound") {
      setInState(
        xorKey(
          mixColumnOperation(
            shiftRows(subBytesMatrix(inState, sbox)),
            fixedMatrix
          ),
          roundKey
        )
      );

      setRoundKey(
        Array.from({ length: 4 }, () =>
          Array.from(
            { length: 4 },
            () => Math.floor(Math.random() * 1024) & 0xff
          )
        )
      );
      setDisplay("");
    } else {
      setDisplay(d);
    }
  }

  return (
    <div className="flex flex-rows justify-center gap-20">
      <div>
        {Children.map(children, (child, idx) => {
          console.log(child.props);
          return (
            <motion.div
              drag
              dragSnapToOrigin
              key={idx}
              onClick={() => {
                clickHandler(child.props.display);
              }}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
      <div>{getDisplay()}</div>
    </div>
  );
}
