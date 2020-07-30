import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";

import { gameInfoContext } from "../../../../../providers/GameInfo";
import strings from "../../../../../constants/localizedStrings";
import PlayButton from "./playButton";
import CountDown from "./countDown";
import { Functions } from "../../utils/interfaces";

const StartScreen = () => {
  const { setIsInstructionsVisible } = useContext(gameInfoContext);

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [isPlayButtonVisible, setIsPlayButtonVisible] = useState(false);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  useEffect(() => {
    const makePlayButtonVisibleFn = () => {
      setIsPlayButtonVisible(true);
      setIsCountdownVisible(false);
    };

    const makeCountdownVisibleFn = () => {
      setIsPlayButtonVisible(false);
      setIsCountdownVisible(true);
    };

    setFunctions({
      makePlayButtonVisible: makePlayButtonVisibleFn,
      makeCountdownVisible: makeCountdownVisibleFn,
    });
  }, []);

  // Load the first challenge on first render
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);
    functions.makePlayButtonVisible();
  }, [functions, isFirstLoad]);

  return functions ? (
    <div className="start-screen">
      <div />
      {isCountdownVisible ? (
        <CountDown />
      ) : (
        <PlayButton launch={functions.makeCountdownVisible} />
      )}

      {isPlayButtonVisible ? (
        <div
          className="start-screen__instructions"
          onClick={() => setIsInstructionsVisible(true)}
        >
          {strings.instructionsTitle}
        </div>
      ) : null}
    </div>
  ) : null;
};

export default StartScreen;
