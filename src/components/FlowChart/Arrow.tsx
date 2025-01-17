import { useEffect, useRef } from "react";

import "./Arrow.css";
type Point = { x: number; y: number };

const getRemInPixels = () => {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export default function Arrow({
  tip,
  tail,
}: {
  tip: Point | undefined;
  tail: Point | undefined;
}) {
  if (!tip || !tail) return <div className={`text-4xl translate-y-[-5%] rotate-12`}>↓</div>;


  //   const tip = boundingRect.get(idx+1) ? boundingRect.get(idx+1)[1] :  boundingRect.get(idx)[0];
  //   const tail = boundingRect.get(idx)[1];
  const rem = getRemInPixels();
  const dx = tail.x - tip.x;
  const dy = tail.y - (tip.y + 2.5 * rem);
  const angle = 90 - Math.floor((Math.atan2(-dy, dx) * 180) / Math.PI);
  const style: React.CSSProperties = {
    "--angle": `${angle}deg`,
  } as React.CSSProperties;

  return (
    <div className={"text-4xl translate-y-[-5%] rotate-arrow"} style={style}>
      ↓
    </div>
  );
}
