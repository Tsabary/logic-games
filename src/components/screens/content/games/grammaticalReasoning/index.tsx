import "./styles.scss";
import React, { useState, useContext, useEffect } from "react";

import { gameInfoContext } from "../../../../../providers/GameInfo";
import strings from "../../../../../constants/localizedStrings";
import { playCorrect, playWrong } from "../../../../../sounds/playFunctions";
import { ReactComponent as Check } from "../../../../assets/general/check.svg";
import { ReactComponent as X } from "../../../../assets/general/x.svg";
import { GrammaticalReasoningTest } from "./utils/classes";
import { startTest, getColor, getText, getRadius } from "./utils/functions";
import { handleChoice } from "./utils/functions";
import { startCountdown } from "../utils/functions";
import { ZeroOne } from "../../../../utils/interfaces";
import { Functions } from "../../utils/interfaces";

// We use 0 and 1 accross the challnege to define red & blue, both as text and as color. When he user makes a choice, we compare the value of the text that they picked, with the color of the test we've presented them with

const GrammaticalReasoning = () => {
  const {
    setScore,
    isSoundOn,
    setGameStartTime,
    setIsGameTimerRunning,
    setTimePerGame,
  } = useContext(gameInfoContext);

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [test, setTest] = useState<GrammaticalReasoningTest | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [choice, setChoice] = useState<ZeroOne>();
  const [isIndicatorShowing, setIsIndicatorShowing] = useState<boolean>(false);

  useEffect(() => {
    const startCountdownFn = () => {
      startCountdown(
        setGameStartTime,
        setIsGameTimerRunning,
        setTimePerGame,
        90
      );
    };

    const startTestFn = (startCount?: () => void) =>
      startTest(test, setTest, startCount);
    const playSoundFn = (isCorrect: boolean) => {
      if (isSoundOn) isCorrect ? playCorrect.play() : playWrong.play();
    };

    setFunctions({
      startTest: startTestFn,
      playSound: playSoundFn,
      startCountdown: startCountdownFn,
    });
  }, [
    test,
    isSoundOn,
    setGameStartTime,
    setIsGameTimerRunning,
    setTimePerGame,
  ]);

  // Load the first challenge on first render
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);
    functions.startTest(functions.startCountdown);
  }, [functions, isFirstLoad]);

  return test && functions ? (
    <div className="gram-reas">
      <div className="gram-reas__container">
        <div
          className="gram-reas__challenge--text"
          style={{ visibility: isIndicatorShowing ? "hidden" : "visible" }}
        >
          {getText(test)}
        </div>

        <div
          className="gram-reas__challenge--outer"
          style={{
            backgroundColor: getColor(test.illustration.colors[0]),
            borderRadius: getRadius(test.illustration.shapes[0]),
            visibility: isIndicatorShowing ? "hidden" : "visible",
          }}
        >
          <div
            className="gram-reas__challenge--inner"
            style={{
              backgroundColor: getColor(test.illustration.colors[1]),
              borderRadius: getRadius(test.illustration.shapes[1]),
            }}
          />
        </div>

        <div className="gram-reas__options">
          <div
            className="choice choice--border choice--red clickable"
            onClick={() =>
              handleChoice(
                false,
                0,
                setChoice,
                test,
                setIsCorrect,
                setScore,
                setIsIndicatorShowing,
                (isCorrect: boolean) => functions.playSound(isCorrect),
                functions.startTest
              )
            }
          >
            {strings.false}
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
            className="choice choice--border choice--green clickable"
            onClick={() =>
              handleChoice(
                true,
                1,
                setChoice,
                test,
                setIsCorrect,
                setScore,
                setIsIndicatorShowing,
                (isCorrect: boolean) => functions.playSound(isCorrect),
                functions.startTest
              )
            }
          >
            {strings.true}
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

export default GrammaticalReasoning;
