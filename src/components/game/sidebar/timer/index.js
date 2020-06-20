import "./styles.scss";
import React, { useState, useEffect, useRef, useContext } from "react";
import { playFinished, playCdFinal } from "../../../../sounds/playFunctions";

import { GameInfoContext } from "../../../../providers/GameInfo";
import strings from "../../../../constants/localizedStrings";

const Timer = () => {
  const gameLength = 120;
  const { isPlaying, setIsDone, isSoundOn } = useContext(GameInfoContext);
  const [timeLeft, setTimeLeft] = useState(gameLength);
  let interval = useRef(null);

  useEffect(() => {
    // We only set the interval when the game has initiated
    if (!isPlaying) return;
    let startTime = Date.now();

    // We change how much time is left every 100 milliseconds so the progress bar would  resize smoothly
    // We use timesamps to set the time rather than just relying on the interval doing its job, to prevent the timer from stopping when the tab is out of focus
    interval.current = setInterval(() => {
      setTimeLeft(() => gameLength - (Date.now() - startTime) / 1000);
    }, 100);
    return () => clearInterval(interval.current);
  }, [isPlaying]);

  useEffect(() => {
    // When we reach 0, the game is over. We clear the interval and we set "isDone" to true to show the finish screen
    if (timeLeft < 0.05) {
      clearInterval(interval.current);
      setTimeLeft(0);
      setIsDone(true);
      if (isSoundOn) playFinished.play();
    }

    if (timeLeft > 9.85 && timeLeft < 9.95) {
      if (isSoundOn) playCdFinal.play();
    }
  }, [interval, timeLeft]);

  return (
    <div className="timer">
      <div className="timer__bar-container">
        <div
          className="timer__bar"
          style={{ height: `${(timeLeft / 120) * 100}%` }}
        />
      </div>
      <div className="label" style={{ marginTop: "2rem" }}>
        {strings.time}
      </div>
      <div className="sidebar__label" style={{ marginTop: "-.5rem" }}>
        {Math.ceil(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;
