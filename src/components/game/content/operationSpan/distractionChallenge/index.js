import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import { GameInfoContext } from "../../../../../providers/GameInfo";
import strings from "../../../../../constants/localizedStrings";
import { ReactComponent as X } from "../../../../assets/x.svg";
import { ReactComponent as Check } from "../../../../assets/check.svg";
import { playCorrect, playWrong } from "../../../../../sounds/playFunctions";

const DistractionChallenge = ({ challenge, handleAnswer }) => {
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
    setTimePerAction(5);
    setActionTimeLeft(5);
  }, []);

  // This should only execute once on load and once on unload. When we
  useEffect(() => {
    if (!timePerAction) return;

    startCounting();
    return () => {
      // setAnswer(0);
      stopCounting();
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

  // When we want to start counting we set these values. These all affect what happens in the action timer in the sidebar
  const startCounting = () => {
    // console.log("Should start counting");

    // We set a new start time to check how long it takes the user to answer
    setActionStartTime(Date.now());

    // We set actionTimerRunning to true so it'll run the count interval inside the time counter.
    setIsActionTimerRunning(true);
  };

  // When we want to stop counting we set these values. These all affect what happens in the action timer in the sidebar
  const stopCounting = () => {
    // We reset the start time to default, as this will be reset to the current date when this component is rendered again (and we'll that info)
    setActionStartTime(0);

    // We reset the time per action to 0 so when we reload this component or other components that use the timer, they wont start counting until they set the time per action
    setTimePerAction(0);

    // We set actionTimerRunning to false so it won't run the count interval inside the time counter.
    setIsActionTimerRunning(false);
  };

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
  );
};

export default DistractionChallenge;
