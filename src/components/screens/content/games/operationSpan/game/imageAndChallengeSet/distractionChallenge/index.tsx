import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import { gameInfoContext } from "../../../../../../../../providers/GameInfo";
import strings from "../../../../../../../../constants/localizedStrings";
import { ReactComponent as X } from "../../../../../../../assets/general/x.svg";
import { ReactComponent as Check } from "../../../../../../../assets/general/check.svg";

import equations from "../../../utils/equations";
import {
  startCounting,
  stopCounting,
  playSuccessIndicationSound,
  dropLevel,
} from "../../../../utils/functions";
import { Equation } from "../../../utils/classes";
import { checkAnswer, submitAnswer } from "./utils/functions";
import { Functions } from "../../../../../utils/interfaces";
import { operationSpanContext } from "../../../../../../../../providers/OperationSpan";

const DistractionChallenge = () => {
  const {
    level,
    setIsActionTimerRunning,
    fouls,
    setFouls,
    setTimePerAction,
    setActionStartTime,
    isSoundOn,
    setIsLevelSuccessful,
    setLevel,
  } = useContext(gameInfoContext);

  const { setUserAnswers } = useContext(operationSpanContext);

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [answer, setAnswer] = useState(0);
  const [isIndicatorShowing, setIsIndicatorShowing] = useState(false);
  const [challenge, setChallenge] = useState<Equation>();

  useEffect(() => {
    const dropLevelFn = () => dropLevel(setIsLevelSuccessful, level, setLevel);

    const startCountingFn = () => {
      startCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning,
        10
      );
    };

    const stopCountingFn = () => {
      stopCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning
      );
    };

    const submitAnswerFn = (isCorrect: boolean) =>
      submitAnswer(
        (isCorrect: boolean) =>
          setUserAnswers((userAnswers: boolean[]) => [
            ...userAnswers,
            isCorrect,
          ]),
        fouls,
        () => setFouls((fouls: number) => fouls + 1),
        isCorrect,
        dropLevelFn
      );

    const checkAnswerFn = (isCorrect: boolean, buttonNumber: number) => {
      checkAnswer(
        isCorrect,
        buttonNumber,
        stopCountingFn,
        (isCorrect: boolean) =>
          playSuccessIndicationSound(isCorrect, isSoundOn),
        (buttonNumber: number) => setAnswer(buttonNumber),
        () => setIsIndicatorShowing(true),
        () => setIsIndicatorShowing(false),
        () => submitAnswerFn(isCorrect)
      );
    };

    const setNewChallengeFn = () => {
      setChallenge(equations[Math.floor(Math.random() * equations.length)]);
    };

    setFunctions({
      startCounting: startCountingFn,
      stopCounting: stopCountingFn,
      checkAnswer: checkAnswerFn,
      submitAnswer: submitAnswerFn,
      setNewChallenge: setNewChallengeFn,
    });
  }, [
    level,
    setLevel,
    setIsLevelSuccessful,
    setActionStartTime,
    setTimePerAction,
    setIsActionTimerRunning,
    setUserAnswers,
    fouls,
    setFouls,
    isSoundOn,
  ]);

  // When we first load we need to make the image visible
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);

    functions.setNewChallenge();
  }, [functions, isFirstLoad]);

  // This should only execute once on load and once on unload. When we
  useEffect(() => {
    if (!functions) return;
    functions.startCounting();

    return () => {
      functions.stopCounting();
    };
  }, [functions]);

  const renderIndicator = (isCorrect: boolean) => {
    return isCorrect ? (
      <div className="distraction__option distraction__option--indicator">
        <Check style={{ color: "#231826", height: "5rem", width: "5rem" }} />
      </div>
    ) : (
      <div className="distraction__option distraction__option--indicator">
        <X style={{ color: "#231826", height: "5rem", width: "5rem" }} />
      </div>
    );
  };

  return challenge && functions ? (
    <div className="distraction">
      <div className="distraction__challenge">{challenge.problem}</div>

      <div className="distraction__options">
        <div className="distraction__option">
          <div
            className="distraction__option--text distraction__option--text-true"
            onClick={() => functions.checkAnswer(challenge.answer, 1)}
          >
            {strings.true}
          </div>

          {isIndicatorShowing && answer === 1
            ? renderIndicator(challenge.answer)
            : null}
        </div>

        <div className="distraction__option">
          <div
            className="distraction__option--text distraction__option--text-false"
            onClick={() => functions.checkAnswer(!challenge.answer, 2)}
          >
            {strings.false}
          </div>

          {isIndicatorShowing && answer === 2
            ? renderIndicator(!challenge.answer)
            : null}
        </div>
      </div>
    </div>
  ) : null;
};

export default DistractionChallenge;
