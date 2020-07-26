import "./styles.scss";
import React, { useEffect, useRef, useContext, useState } from "react";

import { GameInfoContext } from "../../../../providers/GameInfo";
import strings from "../../../../constants/localizedStrings";

const ActionTimer = () => {
  const {
    isPlaying,
    isDone,
    timePerAction,
    setTimePerAction,
    actionStartTime,
    isActionTimerRunning,
    setIsActionTimerRunning,
    setFails,
  } = useContext(GameInfoContext);
  let timerInterval = useRef();
  const [actionTimeLeft, setActionTimeLeft] = useState(0);

  useEffect(() => {
    if (isDone) {
      setIsActionTimerRunning(false);
      setTimePerAction(null);
    }
  }, [isDone, setIsActionTimerRunning, setTimePerAction]);

  useEffect(() => {
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  useEffect(() => {
    // If the time per action has been set, and the action time should be running (that state should change between rounds too), then we reset the actio timer to the initial time per action
    if (timePerAction && isActionTimerRunning) {
      setActionTimeLeft(timePerAction);
    }
  }, [isActionTimerRunning, timePerAction]);

  useEffect(() => {
    // When we just load this component, we set the time to how much time we want it to have. This is a dynamic value because we might want different values for different games
    setActionTimeLeft(timePerAction);
  }, [timePerAction, setActionTimeLeft]);

  useEffect(() => {
    // // We only set the interval when the game has initiated
    // if (!isPlaying || !isActionTimerRunning) return;

    if (isPlaying && isActionTimerRunning) {
      // We change how much time is left every 100 milliseconds so the progress bar would resize smoothly
      // We use timesamps to set the time rather than just relying on the interval doing its job, to prevent the timer from stopping when the tab is out of focus
      timerInterval.current = setInterval(() => {
        setActionTimeLeft(
          () => timePerAction - (Date.now() - actionStartTime) / 1000
        );
      }, 100);
      return () => clearInterval(timerInterval.current);
    } else if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
  }, [
    isPlaying,
    actionStartTime,
    isActionTimerRunning,
    timePerAction,
    setActionTimeLeft,
    timerInterval,
  ]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (actionTimeLeft < 0 && isActionTimerRunning) {
      setIsActionTimerRunning(false);
      console.log("thissssssssssssssssssss from timer", isActionTimerRunning);
      console.log("thissssssssssssssssssss from timer", actionTimeLeft);
      setFails((fails) => fails + 1);
    }
  }, [actionTimeLeft, setFails, isActionTimerRunning, setIsActionTimerRunning]);

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
