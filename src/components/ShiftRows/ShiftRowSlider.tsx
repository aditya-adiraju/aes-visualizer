import {
  Dispatch,
  MutableRefObject,
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface ShiftRowSliderProps {
  state: number[][];
  setState: Dispatch<SetStateAction<number[][]>>;
  inputStateRef: MutableRefObject<number[][]>;
  setShiftingRow: Dispatch<SetStateAction<[number, number]>>;
}

export default function ShiftRowSlider({
  state,
  setState,
  inputStateRef,
  setShiftingRow,
}: ShiftRowSliderProps) {
  const [step, setStep] = useState<number>(1);
  const oldStep = useRef(0);

  function handleChange(s: number): void {
    if (s == oldStep.current) return;

    const shiftedList: number[][] = JSON.parse(
      JSON.stringify(inputStateRef.current) // a surprisingly fast way to deepcopy
    );
    for (let i = 0; i < s; i++) {
      setShiftingRow([i, i]);
      for (let j = 0; j < i; j++) {
        if (i === s - 1) {
          setTimeout(() => {
            const firstElement: number | undefined = shiftedList[i].shift();
            if (firstElement) shiftedList[i].push(firstElement);
            setShiftingRow([-1, -1]);
          }, 1000);
        } else {
          const firstElement: number | undefined = shiftedList[i].shift();
          if (firstElement) shiftedList[i].push(firstElement);
        }
      }
    }
    setState(shiftedList);
  }

  useEffect(() => handleChange(step), [step]);

  return (
    <>
      <input
        type="range"
        className="slider"
        value={step || 1}
        min={1}
        max={state.length}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const newValue = parseInt(e.target.value, 10);
          if (!Number.isNaN(newValue)) {
            setStep(Math.min(newValue, state.length || 1));
          }
        }}
      />
      <h2 className="text-xl font-bold">Step: {step}</h2>
    </>
  );
}
