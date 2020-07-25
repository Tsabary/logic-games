import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import { GameInfoContext } from "../../../../../providers/GameInfo";
import strings from "../../../../../constants/localizedStrings";
import { ReactComponent as X } from "../../../../assets/general/x.svg";
import { ReactComponent as Check } from "../../../../assets/general/check.svg";
import { playCorrect, playWrong } from "../../../../../sounds/playFunctions";

import equations from "../utils/equations";
import { startCounting, stopCounting } from "../../utils";

const DistractionChallenge = ({ handleAnswer }) => {
  const {
    setIsActionTimerRunning,
    timePerAction,
    setTimePerAction,
    setActionStartTime,
    actionTimeLeft,
    setActionTimeLeft,
    isSoundOn,
  } = useContext(GameInfoContext);

  const [answer, setAnswer] = useState(0);
  const [isIndicatorShowing, setIsIndicatorShowing] = useState(false);

  useEffect(() => {
    // We set a new distraction question
    setChallenge(equations[Math.floor(Math.random() * equations.length)]);
  }, []);

  // This holds our challenge/distraction Q
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    setTimePerAction(10);
    setActionTimeLeft(10);
  }, []);

  // This should only execute once on load and once on unload. When we
  useEffect(() => {
    if (!timePerAction) return;

    startCounting(setActionStartTime, setIsActionTimerRunning);
    return () => {
      stopCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning
      );
    };
  }, [timePerAction]);

  // If the user took longer than 5 seconds to answer the distraction question, then it qualifies as a fail (wrong answer). We then call the stop counting method and call the handleOvertimr method we got from the parent component, so it'll handle this fail on it's side.
  useEffect(() => {
    if (actionTimeLeft < 0) {
      stopCounting();
      handleAnswer(false);
      if (isSoundOn) playWrong.play();
    }
  }, [actionTimeLeft]);

  // This is where we check the answer for the distraction questions. True or false, we immediatly stop the count, and then we call the handleAnswer method we got from the parent component, so it'll handle this fail on it's side.
  const checkAnswer = (answer) => {
    console.log("Checking answer", answer);
    if (isSoundOn) {
      answer === challenge.answer ? playCorrect.play() : playWrong.play();
    }

    if (isIndicatorShowing) return;

    setAnswer(answer ? 1 : 2);
    stopCounting();
    setIsIndicatorShowing(true);
    console.log("Checking answer - indicator should be on");

    setTimeout(() => {
      handleAnswer(answer === challenge.answer);
      setIsIndicatorShowing(false);
      console.log("Checking answer - indicator should be off");
    }, [1000]);
  };

  const renderIndicator = (isCorrect) => {
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

  return challenge ? (
    <div className="distraction">
      <div className="distraction__challenge">{challenge.problem}</div>

      <div className="distraction__options">
        <div className="distraction__option">
          <div
            className="distraction__option--text distraction__option--text-true"
            onClick={() => checkAnswer(true)}
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
            onClick={() => checkAnswer(false)}
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
