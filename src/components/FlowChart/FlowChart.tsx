import { motion } from "motion/react";
import { Children, useEffect, useRef, useState } from "react";
import "../../index.css";
import {
  mixColumnOperation,
  shiftRows,
  subBytesMatrix,
  xorKey,
  sbox,
} from "../lib";
import MixColumns from "../MixColumns/MixColumns";
import ShiftRows from "../ShiftRows/ShiftRows";
import SubBytes from "../SubBytes/SubBytes";
import XorRoundKey from "../XorRoundKey/XorRoundKey";
import Arrow from "./Arrow";

const fixedMatrix: number[][] = [
  [0x2, 0x3, 0x1, 0x1],
  [0x1, 0x2, 0x3, 0x1],
  [0x1, 0x1, 0x2, 0x3],
  [0x3, 0x1, 0x1, 0x2],
];

export default function FlowChart({ children }) {
  const [display, setDisplay] = useState<string>("");
  const childrenRef = useRef(new Map());
  const [boundingRects, setBoundingRects] = useState(new Map());
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

  useEffect(() => {
    const m = new Map();
    Array.from(childrenRef.current.entries()).map((entry) => {
      m.set(entry[0], [
        {
          x:
            entry[1].getBoundingClientRect().x +
            entry[1].getBoundingClientRect().width / 2,
          y:
            entry[1].getBoundingClientRect().y +
            entry[1].getBoundingClientRect().height,
        },
        {
          x:
            entry[1].getBoundingClientRect().x +
            entry[1].getBoundingClientRect().width / 2,
          y:
            entry[1].getBoundingClientRect().y +
            entry[1].getBoundingClientRect().height,
        },
        {
          width: entry[1].getBoundingClientRect().width,
          height: entry[1].getBoundingClientRect().height,
        },
      ]);
    });
    setBoundingRects(m);
    console.log(Array.from(m.entries()));
  }, []);

  function getDisplay() {
    switch (display) {
      case "SubBytes":
        return (
          <div key={display} className="fadeIn">
            <SubBytes inState={inState} sbox={sbox} />
          </div>
        );
      case "ShiftRows":
        return (
          <div key={display} className="fadeIn">
            <ShiftRows inState={subBytesMatrix(inState, sbox)} />
          </div>
        );
      case "MixColumns":
        return (
          <div key={display} className="fadeIn">
            <MixColumns
              inState={shiftRows(subBytesMatrix(inState, sbox))}
              fixedMatrix={fixedMatrix}
            />
          </div>
        );
      case "XorRoundKey":
        return (
          <div key={display} className="fadeIn">
            <XorRoundKey
              inState={mixColumnOperation(
                shiftRows(subBytesMatrix(inState, sbox)),
                fixedMatrix
              )}
              roundKey={roundKey}
            />
          </div>
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
    <div className="flex flex-rows justify-center gap-20 align-middle items-center ">
      <div className="fadeInUp">
        {Children.map(children, (child, idx) => {
          return (
            <>
              <motion.div
                drag
                dragSnapToOrigin
                ref={(node) => {
                  if (node) {
                    childrenRef.current.set(idx, node);
                  } else {
                    childrenRef.current.delete(idx);
                  }
                }}
                key={idx}
                onClick={() => {
                  clickHandler(child.props.display);
                }}
                onDrag={(e, i) => {
                  console.log(child.props);
                  const w = boundingRects.get(idx)[2].width;
                  const h = boundingRects.get(idx)[2].height;
                  const m = new Map(
                    boundingRects.set(idx, [
                      boundingRects.get(idx)[0],
                      { x: i.point.x + w / 2, y: i.point.y + h },
                      boundingRects.get(idx)[2],
                    ])
                  );
                  e.preventDefault();
                  setBoundingRects(m);
                }}
                onDragEnd={(e, i) => {
                  const m = new Map(
                    boundingRects.set(idx, [
                      boundingRects.get(idx)[0],
                      boundingRects.get(idx)[0],
                      boundingRects.get(idx)[2],
                    ])
                  );
                  setBoundingRects(m);
                }}
              >
                <div onPointerDownCapture={(e) => e.stopPropagation()}>
                  {child}
                </div>
              </motion.div>
              {children.length > idx + 1 && (
                <Arrow
                  tip={
                    boundingRects.get(idx + 1)
                      ? boundingRects.get(idx + 1)[1]
                      : boundingRects.get(idx)
                      ? boundingRects.get(idx)[0]
                      : undefined
                  }
                  tail={
                    boundingRects.get(idx)
                      ? boundingRects.get(idx)[1]
                      : undefined
                  }
                />
              )}
            </>
          );
        })}
      </div>
      <div className="min-w-[50%] min-h-[50%]">{getDisplay()}</div>
    </div>
  );
}
