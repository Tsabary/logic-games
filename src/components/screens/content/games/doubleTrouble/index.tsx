import "./styles.scss";
import React, { useState, useContext, useEffect } from "react";

import { gameInfoContext } from "../../../../../providers/GameInfo";
import strings from "../../../../../constants/localizedStrings";
import { ReactComponent as Check } from "../../../../assets/general/check.svg";
import { ReactComponent as X } from "../../../../assets/general/x.svg";

import { DoubleTroubleObject } from "./utils/classes";
import { getText, resetTest, handleChoice } from "./utils/functions";
import { startCountdown, playSuccessIndicationSound } from "../utils/functions";
import { ZeroOne } from "../../../../utils/interfaces";
import { Functions } from "../../utils/interfaces";

// We use 0 and 1 accross the challnege to define red & blue, both as text and as color. When he user makes a choice, we compare the value of the text that they picked, with the color of the test we've presented them with

const DoubleTrouble = () => {
  const {
    setScore,
    isSoundOn,
    setGameStartTime,
    setIsGameTimerRunning,
    setTimePerGame,
  } = useContext(gameInfoContext);

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [test, setTest] = useState<DoubleTroubleObject | null>(null);
  const [options, setOptions] = useState<DoubleTroubleObject[] | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [choice, setChoice] = useState<ZeroOne | null>(null);
  const [isIndicatorShowing, setIsIndicatorShowing] = useState<boolean>(false);

  useEffect(() => {
    // We define the different functions
    const startCountdownFn = () => {
      startCountdown(
        setGameStartTime,
        setIsGameTimerRunning,
        setTimePerGame,
        90
      );
    };

    const resetTestFn = (startCount?: () => void) =>
      resetTest(test, options, setTest, setOptions, startCount);

    // We set them to our controller
    setFunctions({
      startCountdown: startCountdownFn,
      resetTest: resetTestFn,
      playSound: (isCorrect: boolean) => {
        playSuccessIndicationSound(isCorrect, isSoundOn);
      },
    });
  }, [
    test,
    options,
    setTest,
    setOptions,
    isSoundOn,
    setGameStartTime,
    setIsGameTimerRunning,
    setTimePerGame,
  ]);

  // Load the first challenge on first render
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);
    functions.resetTest(functions.startCountdown);
  }, [functions, isFirstLoad]);

  return test && options && functions ? (
    <div className="double-trouble">
      <div className="double-trouble__container">
        <div
          className={
            test.color === 0 ? "choice choice--red" : "choice choice--blue"
          }
          style={{ visibility: isIndicatorShowing ? "hidden" : "visible" }}
        >
          {getText(test.text, strings)}
        </div>

        <div className="double-trouble__options">
          <div
            className={
              options[0].color === 0
                ? "choice choice--border choice--red clickable"
                : "choice choice--border choice--blue clickable"
            }
            onClick={() =>
              handleChoice(
                options[0].text,
                0,
                test,
                setChoice,
                setIsCorrect,
                setScore,
                setIsIndicatorShowing,
                functions.playSound,
                functions.resetTest
              )
            }
          >
            {getText(options[0].text, strings)}
            {isIndicatorShowing && choice === 0 ? (
              <div className="choice__hint-container choice__hint-container--left">
                <div
                  className={
                    isCorrect
                      ? "choice__hint choice__hint--correct"
                      : "choice__hint choice__hint--wrong"
                  }
                >
                  {isCorrect ? (
                    <Check className="choice__hint-icon--correct" />
                  ) : (
                    <X className="choice__hint-icon--wrong" />
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div
            className={
              options[1].color === 0
                ? "choice choice--border choice--red clickable"
                : "choice choice--border choice--blue clickable"
            }
            onClick={() =>
              handleChoice(
                options[1].text,
                1,
                test,
                setChoice,
                setIsCorrect,
                setScore,
                setIsIndicatorShowing,
                functions.playSound,
                functions.resetTest
              )
            }
          >
            {getText(options[1].text, strings)}
            {isIndicatorShowing && choice === 1 ? (
              <div className="choice__hint-container choice__hint-container--right">
                <div
                  className={
                    isCorrect
                      ? "choice__hint choice__hint--correct"
                      : "choice__hint choice__hint--wrong"
                  }
                >
                  {isCorrect ? (
                    <Check className="choice__hint-icon--correct" />
                  ) : (
                    <X className="choice__hint-icon--wrong" />
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default DoubleTrouble;
