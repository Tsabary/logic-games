import React, { useEffect, useRef } from "react";

type IntervalFunction = () => unknown | void;

export const useInterval = (
  callback: IntervalFunction,
  delay: number | null
) => {
  const savedCallback = useRef<IntervalFunction | null>(null);

  useEffect(() => {
    if (delay === null) return;
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay === null) return;
    function tick() {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export const resetActionTimer = (
  setIsActionTimerRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setTimePerAction: React.Dispatch<React.SetStateAction<number | undefined>>,
  setActionTimeLeft: React.Dispatch<React.SetStateAction<number | undefined>>
) => {
  setIsActionTimerRunning(false);
  setTimePerAction(undefined);
  setActionTimeLeft(undefined);
};
