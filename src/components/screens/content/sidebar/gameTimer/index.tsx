import "./styles.scss";
import React, { useEffect, useRef, useContext, useState } from "react";
import { playFinished, playCdFinal } from "../../../../../sounds/playFunctions";

import { gameInfoContext } from "../../../../../providers/GameInfo";
import strings from "../../../../../constants/localizedStrings";

const GameTimer = () => {
  const {
    timePerGame,
    setTimePerGame,
    gameStartTime,
    isGameTimerRunning,
    setIsGameTimerRunning,
    isPlaying,
    isDone,
    setIsDone,
    isSoundOn,
  } = useContext(gameInfoContext);

  let timerInterval: { current: NodeJS.Timeout | undefined } = useRef();
  const clearTimerInterval = () => {
    if (timerInterval.current) clearInterval(timerInterval.current);
  };

  // For games that are based on time, this is where we keep track of how much time the player has left
  const [gameTimeLeft, setGameTimeLeft] = useState<number>(0);

  // This is a general cleanup of the interval if some whatever resason it hasn't been cleared, this should clear it.
  useEffect(() => {
    return () => clearTimerInterval();
  }, []);

  // If the game has been set as done, we want to make sure that the timer isn't running and that it has been cleared
  useEffect(() => {
    if (isDone) {
      setIsGameTimerRunning(false);
      setTimePerGame(null);
    }
  }, [isDone, setIsGameTimerRunning, setTimePerGame]);

  // If the action timer gets the signal to run and the time per action has been set, it's a sign for us to set the action time left to start the count
  useEffect(() => {
    // If the time per action has been set, and the action time should be running (that state should change between rounds too), then we reset the actio timer to the initial time per action
    if (timePerGame && isGameTimerRunning) {
      setGameTimeLeft(timePerGame);
    }
  }, [isGameTimerRunning, timePerGame]);

  useEffect(() => {
    // We only set the interval when the game has initiated
    if (isPlaying && isGameTimerRunning) {
      // We change how much time is left every 100 milliseconds so the progress bar would  resize smoothly
      // We use timesamps to set the time rather than just relying on the interval doing its job, to prevent the timer from stopping when the tab is out of focus
      timerInterval.current = setInterval(() => {
        setGameTimeLeft(
          () => timePerGame - (Date.now() - gameStartTime) / 1000
        );
      }, 100);
    }

    return () => clearTimerInterval();
  }, [isPlaying, isGameTimerRunning, gameStartTime, timePerGame]);

  useEffect(() => {
    // When we reach 0, the game is over. We clear the interval and we set "isDone" to true to show the finish screen
    if (gameTimeLeft < 0 && isGameTimerRunning && timePerGame) {
      clearTimerInterval();
      setGameTimeLeft(0);
      setIsDone(true);
      if (isSoundOn) playFinished.play();
    }

    if (gameTimeLeft > 9.85 && gameTimeLeft < 9.95) {
      if (isSoundOn) playCdFinal.play();
    }
  }, [gameTimeLeft, isSoundOn, setIsDone, isGameTimerRunning, timePerGame]);

  return (
    <div className="timer">
      <div className="timer__bar-container">
        <div
          className="timer__bar"
          style={{ height: `${(gameTimeLeft / timePerGame) * 100}%` }}
        />
      </div>
      <div className="label" style={{ marginTop: "2rem" }}>
        {strings.time}
      </div>
      <div className="sidebar__label" style={{ marginTop: "-.5rem" }}>
        {!isGameTimerRunning
          ? "-"
          : gameTimeLeft > -1
          ? Math.ceil(gameTimeLeft)
          : 0}
      </div>
    </div>
  );
};

export default GameTimer;
