import { useEffect, useRef } from "react";

type Point = {x: number, y: number}
export default function Arrow ({ start, end, color = "black", strokeWidth = 2 }: {start: Point, end: Point, color?: string, strokeWidth?: numebr}){
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const angle = useRef(Math.atan2(dy, dx) * (180 / Math.PI)); 
  const length = useRef(Math.sqrt(dx * dx + dy * dy)); 

  return (
    <div
      style={{
        position: "absolute",
        top: start.y,
        left: start.x - strokeWidth/2,
        transform: `rotate(${angle.current}deg)`,
        transformOrigin: "0 0",
        pointerEvents: "none",
      }}
    >
      <svg
        width={length.current}
        height={strokeWidth * 2}
        style={{ overflow: "visible" }}
      >
        <line
          x1="0"
          y1={strokeWidth}
          x2={length.current}
          y2={strokeWidth}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
};

