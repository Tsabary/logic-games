import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import { GameInfoContext } from "../../../../../providers/GameInfo";
import strings from "../../../../../constants/localizedStrings";
import { ReactComponent as X } from "../../../../assets/x.svg";
import { ReactComponent as Check } from "../../../../assets/check.svg";
import { playCorrect, playWrong } from "../../../../../sounds/playFunctions";

const DistractionChallenge = ({ challenge, handleAnswer, handleOvertime }) => {
  const {
    setIsActionTimerRunning,
    setActionStartTime,
    actionTimeLeft,
    setActionTimeLeft,
    isSoundOn,
  } = useContext(GameInfoContext);

  const [answer, setAnswer] = useState(0);
  const [isIndicatorShowing, setIsIndicatorShowing] = useState(false);

  // This should only execute once on load and once on unload. When we
  useEffect(() => {
    startCounting();
    return () => {
      setAnswer(0);
      stopCounting();
    };
  }, []);

  // When we want to start counting we set these values. These all affect what happens in the action timer in the sidebar
  const startCounting = () => {
    // We set a new start time to check how long it takes the user to answer
    setActionStartTime(Date.now());

    // We reset our time resraint to 5 seconds
    setActionTimeLeft(5);

    // We set actionTimerRunning to true so it'll run the count interval inside the time counter.
    setIsActionTimerRunning(true);
  };

  // When we want to stop counting we set these values. These all affect what happens in the action timer in the sidebar
  const stopCounting = () => {
    // We reset the start time to default, as this will be reset to the current date when this component is rendered again (and we'll that info)
    setActionStartTime(0);

    // We reset our time resraint to 5 seconds
    setActionTimeLeft(5);

    // We set actionTimerRunning to false so it won't run the count interval inside the time counter.
    setIsActionTimerRunning(false);
  };

  // If the user took longer than 5 seconds to answer the distraction question, then it qualifies as a fail (wrong answer). We then call the stop counting method and call the handleOvertimr method we got from the parent component, so it'll handle this fail on it's side.
  useEffect(() => {
    if (actionTimeLeft <= 0) {
      stopCounting();
      handleOvertime();
      playWrong.play();
    }
  }, [actionTimeLeft, handleOvertime]);

  // This is where we check the answer for the distraction questions. True or false, we immediatly stop the count, and then we call the handleAnswer method we got from the parent component, so it'll handle this fail on it's side.
  const checkAnswer = (answer) => {
    if (isSoundOn) {
      answer === challenge.answer ? playCorrect.play() : playWrong.play();
    }

    if (isIndicatorShowing) return;

    setAnswer(answer ? 1 : 2);
    stopCounting();
    setIsIndicatorShowing(true);

    setTimeout(() => {
      handleAnswer(answer === challenge.answer);
      setIsIndicatorShowing(false);
    }, [1500]);
  };

  return (
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

          {!isIndicatorShowing || answer !== 1 ? null : challenge.answer ? (
            <div className="distraction__option distraction__option--indicator">
              <Check
                style={{ color: "#231826", height: "5rem", width: "5rem" }}
              />
            </div>
          ) : (
            <div className="distraction__option distraction__option--indicator">
              <X style={{ color: "#231826", height: "5rem", width: "5rem" }} />
            </div>
          )}
        </div>

        <div className="distraction__option">
          <div
            className="distraction__option--text distraction__option--text-false"
            onClick={() => checkAnswer(false)}
          >
            {strings.false}
          </div>

          {!isIndicatorShowing || answer !== 2 ? null : !challenge.answer ? (
            <div className="distraction__option distraction__option--indicator">
              <Check
                style={{ color: "#231826", height: "5rem", width: "5rem" }}
              />
            </div>
          ) : (
            <div className="distraction__option distraction__option--indicator">
              <X style={{ color: "#231826", height: "5rem", width: "5rem" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistractionChallenge;
