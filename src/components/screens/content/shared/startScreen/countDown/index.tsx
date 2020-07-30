import "./styles.scss";
import React, { useEffect, useState, useRef, useContext } from "react";
import { gameInfoContext } from "../../../../../../providers/GameInfo";
import { playCdGo, playCdStart } from "../../../../../../sounds/playFunctions";

const CountDown = () => {
  const { setIsPlaying, isSoundOn } = useContext(gameInfoContext);
  const [timeToStart, setTimeToStart] = useState<number>(3.9);

  let countdownInterval: { current: NodeJS.Timeout | undefined } = useRef();

  const clearCountdownInterval = () => {
    if (countdownInterval.current) clearTimeout(countdownInterval.current);
  };

  useEffect(() => {
    // We only set the interval when the game has been launched by the user (by clicking play)
    countdownInterval.current = setInterval(() => {
      setTimeToStart((tts) => tts - 1);
    }, 1000);

    return () => clearCountdownInterval();
  }, []);

  useEffect(() => {
    if (timeToStart < 0.1) {
      setIsPlaying(true);
      clearCountdownInterval();
    }
  }, [timeToStart, setIsPlaying]);

  useEffect(() => {
    // If time to start is less than 0, this component should get unmounted. Ideali we shouldn' even be here in this case, but this is just a safety measure
    if (timeToStart < 0) return;

    // If we have less than a second to start, we should play the "GO" sound
    if (timeToStart < 1) {
      if (isSoundOn) playCdGo.play();
    }
    // Otherwise, we should play the normal countdown sound. Because the time to start is updating in 1 second intervals, this works great to play our countdown sounds
    else {
      if (isSoundOn) playCdStart.play();
    }
  }, [timeToStart, isSoundOn]);

  return (
    <div className="count-down">
      {timeToStart > 1 ? (
        <div className="counter-sun counter-sun--count">
          <div className="count-down__count">{Math.floor(timeToStart)}</div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <div className="counter-sun counter-sun--go">
          <div className="count-down__go">Go!</div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
};

export default CountDown;
