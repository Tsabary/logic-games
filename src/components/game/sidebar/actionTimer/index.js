import "./styles.scss";
import React, { useEffect, useRef, useContext } from "react";

import { GameInfoContext } from "../../../../providers/GameInfo";
import strings from "../../../../constants/localizedStrings";

const ActionTimer = () => {
  const {
    isPlaying,
    isDone,
    timePerAction,
    actionTimeLeft,
    setActionTimeLeft,
    actionStartTime,
    isActionTimerRunning,
    setIsActionTimerRunning,
  } = useContext(GameInfoContext);

  useEffect(() => {
    if (isDone) setIsActionTimerRunning(false);
  }, [isDone]);

  useEffect(() => {
    // When we just load this component, we set the time to how much time we want it to have. This is a dynamic value because we might want different values for different games
    setActionTimeLeft(timePerAction);
  }, [timePerAction, setActionTimeLeft]);

  let interval = useRef(null);

  useEffect(() => {
    console.log("Should start counting from timer");
    console.log("Should start counting from timer", !isActionTimerRunning);

    // We only set the interval when the game has initiated
    if (!isPlaying || !isActionTimerRunning) return;
    console.log("Should start counting from timer 222");

    // We change how much time is left every 100 milliseconds so the progress bar would resize smoothly
    // We use timesamps to set the time rather than just relying on the interval doing its job, to prevent the timer from stopping when the tab is out of focus
    interval.current = setInterval(() => {
      setActionTimeLeft(
        () => timePerAction - (Date.now() - actionStartTime) / 1000
      );
    }, 100);
    return () => clearInterval(interval.current);
  }, [
    isPlaying,
    actionStartTime,
    isActionTimerRunning,
    timePerAction,
    setActionTimeLeft,
  ]);

  return (
    <div className="action-timer">
      <div className="label">{strings.time}</div>
      <div
        className="sidebar__label"
        style={{
          marginTop: "-.5rem",
          color: actionTimeLeft < 2 && isActionTimerRunning ? "red" : "white",
        }}
      >
        {!isActionTimerRunning
          ? "-"
          : actionTimeLeft > -1
          ? Math.ceil(actionTimeLeft)
          : 0}
      </div>
    </div>
  );
};

export default ActionTimer;
