import "./styles.scss";
import React, { useContext, useEffect, useState, useRef } from "react";

import { GameInfoContext } from "../../../../providers/GameInfo";
import strings from "../../../../constants/localizedStrings";
import PlayButton from "./playButton";
import CountDown from "./countDown";
import { playCdGo, playCdStart } from "../../../../sounds/playFunctions";

const StartScreen = () => {
  const {
    setIsInstructionsVisible,
    isSoundOn,
    isPlaying,
    setIsPlaying,
  } = useContext(GameInfoContext);
  const [timeToStart, setTimeToStart] = useState(3.9);
  const [launch, setLaunch] = useState(false);
  let interval = useRef(null);

  useEffect(() => {
    // We only set the interval when the game has been launched by the user (by clicking play)
    if (!launch) return;
    interval.current = setInterval(() => {
      setTimeToStart((tts) => tts - 1);
    }, 1000);
    return () => clearInterval(interval.current);
  }, [launch]);

  useEffect(() => {
    if (!launch || !interval) return;

    if (timeToStart < 0.1) {
      // When we reach 0, the game is begins. We clear the interval and we set "isPlaying" to true to show the chalenge component screen
      clearInterval(interval.current);
      setIsPlaying(true);
    }
  }, [launch, interval, timeToStart]);

  useEffect(() => {
    if (isPlaying || !launch || timeToStart < 0) return;

    if (timeToStart < 1) {
      if (isSoundOn) playCdGo.play();
    } else {
      if (isSoundOn) playCdStart.play();
    }
  }, [launch, timeToStart, isPlaying]);

  return (
    <div className="start-screen">
      <div />
      {launch ? (
        <CountDown timeToStart={timeToStart} />
      ) : (
        <PlayButton setLaunch={setLaunch}/>
      )}
      {!launch ? (
        <div
          className="start-screen__instructions"
          onClick={() => setIsInstructionsVisible(true)}
        >
          {strings.instructionsTitle}
        </div>
      ) : null}
    </div>
  );
};

export default StartScreen;
