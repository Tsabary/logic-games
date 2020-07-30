import "./styles.scss";
import React, { useEffect, useContext, useState } from "react";

import { gameInfoContext } from "../../../../../providers/GameInfo";
import strings from "../../../../../constants/localizedStrings";
import { dropLevel } from "../../games/utils/functions";
import { resetActionTimer } from "./utils/functions";
import { Functions } from "../../utils/interfaces";

const ActionTimer = () => {
  const {
    isPlaying,
    isDone,
    timePerAction,
    setTimePerAction,
    actionStartTime,
    isActionTimerRunning,
    setIsActionTimerRunning,
    setIsLevelSuccessful,
    setLevel,
  } = useContext(gameInfoContext);

  const [functions, setFunctions] = useState<Functions>();

  const [actionTimeLeft, setActionTimeLeft] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const dropLevelFn = () => {
      dropLevel(setIsLevelSuccessful, setLevel);
    };

    const resetActionTimerFn = () => {
      resetActionTimer(
        setIsActionTimerRunning,
        setTimePerAction,
        setActionTimeLeft
      );
    };

    setFunctions({
      dropLevel: dropLevelFn,
      resetActionTimer: resetActionTimerFn,
    });
  }, [
    setIsLevelSuccessful,
    setLevel,
    setIsActionTimerRunning,
    setTimePerAction,
    setActionTimeLeft,
  ]);

  // If the game has been set as done, we want to make sure that the timer isn't running and that it has been cleared
  useEffect(() => {
    if (!functions || !isDone) return;

    functions.resetActionTimer();
  }, [isDone, functions]);

  // If the action timer gets the signal to run and the time per action has been set, it's a sign for us to set the action time left to start the count
  useEffect(() => {
    // If the time per action has been set, and the action time should be running (that state should change between rounds too), then we reset the actio timer to the initial time per action
    if (timePerAction && isActionTimerRunning) {
      setActionTimeLeft(timePerAction);
    }
  }, [isActionTimerRunning, timePerAction]);

  useEffect(() => {
    // We only set the interval when the game has initiated

    if (isActionTimerRunning) {
      // We change how much time is left every 100 milliseconds so the progress bar would resize smoothly
      // We use timesamps to set the time rather than just relying on the interval doing its job, to prevent the timer from stopping when the tab is out of focus
      const actionTimerInterval = setInterval(() => {
        setActionTimeLeft(
          () => timePerAction - (Date.now() - actionStartTime) / 1000
        );
      }, 100);

      return () => clearInterval(actionTimerInterval);
    }
  }, [
    isPlaying,
    actionStartTime,
    isActionTimerRunning,
    timePerAction,
    setActionTimeLeft,
  ]);

  // This is where we keep track over the time passing. If the action timer is currently running and we have less than 0 time left it mean that the user has failed the time contrainer for their current mission.
  // When that happens, we first stop the time from running and then we add another fail to the count of fails by the user. This should also reset their fouls.
  useEffect(() => {
    if (!functions) return;
    if (
      !timePerAction ||
      !isActionTimerRunning ||
      typeof actionTimeLeft === "undefined"
    )
      return;

    if (actionTimeLeft < 0) {
      functions.resetActionTimer();
      functions.dropLevel();
    }
  }, [timePerAction, isActionTimerRunning, actionTimeLeft, functions]);

  // Our render
  return (
    <div className="action-timer">
      <div className="label">{strings.time}</div>
      <div
        className="sidebar__label"
        style={{
          marginTop: "-.5rem",
          color:
            actionTimeLeft && actionTimeLeft < 2 && isActionTimerRunning
              ? "red"
              : "white",
        }}
      >
        {!isActionTimerRunning
          ? "-"
          : actionTimeLeft && actionTimeLeft > -1
          ? Math.ceil(actionTimeLeft)
          : 0}
      </div>
    </div>
  );
};

export default ActionTimer;
