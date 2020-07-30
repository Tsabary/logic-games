import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import { gameInfoContext } from "../../../../../../providers/GameInfo";
import strings from "../../../../../../constants/localizedStrings";
import { ReactComponent as X } from "../../../../../assets/general/x.svg";
import { ReactComponent as Check } from "../../../../../assets/general/check.svg";
import { playCorrect, playWrong } from "../../../../../../sounds/playFunctions";

import equations from "../utils/equations";
import { startCounting, stopCounting } from "../../utils/functions";
import { Equation } from "../utils/classes";

export interface DistractionChallengeProps {
  handleAnswer: (userCorrect: boolean) => void;
}

const DistractionChallenge = ({ handleAnswer }: DistractionChallengeProps) => {
  const {
    setIsActionTimerRunning,
    timePerAction,
    setTimePerAction,
    setActionStartTime,
    isSoundOn,
  } = useContext(gameInfoContext);

  const [answer, setAnswer] = useState(0);
  const [isIndicatorShowing, setIsIndicatorShowing] = useState(false);
  const [challenge, setChallenge] = useState<Equation>();

  // We pull and set a new challenge for the user to try and solve and we set the time per action to 10. Setting the time per action is what gets the timer going (together with other variables that we don't control from here)
  useEffect(() => {
    setChallenge(equations[Math.floor(Math.random() * equations.length)]);
    // setTimePerAction(10);
  }, [setTimePerAction]);

  // This should only execute once on load and once on unload. When we
  useEffect(() => {
    if (!timePerAction) return;

    startCounting(setActionStartTime,setTimePerAction, setIsActionTimerRunning, 10);
    return () => {
      stopCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning
      );
    };
  }, [
    timePerAction,
    setActionStartTime,
    setIsActionTimerRunning,
    setTimePerAction,
  ]);

  // // If the user took longer than 5 seconds to answer the distraction question, then it qualifies as a fail (wrong answer). We then call the stop counting method and call the handleOvertimr method we got from the parent component, so it'll handle this fail on it's side.
  // useEffect(() => {
  //   if (actionTimeLeft < 0) {
  //     stopCounting();
  //     handleAnswer(false);
  //     if (isSoundOn) playWrong.play();
  //   }
  // }, [actionTimeLeft]);

  // This is where we check the answer for the distraction questions. True or false, we immediatly stop the count, and then we call the handleAnswer method we got from the parent component, so it'll handle this fail on it's side.
  const checkAnswer = (userCorrect: boolean, button: number) => {
    // Stop the count when th user submitts an answer
    stopCounting(setActionStartTime, setTimePerAction, setIsActionTimerRunning);

    // If the sound is on, play indication sounds for the user
    if (isSoundOn) userCorrect ? playCorrect.play() : playWrong.play();

    if (isIndicatorShowing) return;

    // Set a number to indicate which of the options the user has picked. We use this tho show the indicator in the correct place
    setAnswer(button);

    // SHw the indicator
    setIsIndicatorShowing(true);

    setTimeout(() => {
      // After one second we want to hande the result of this challange
      handleAnswer(userCorrect);

      // We set the indicator to invisible again
      setIsIndicatorShowing(false);
    }, 1000);
  };

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

  return challenge ? (
    <div className="distraction">
      <div className="distraction__challenge">{challenge.problem}</div>

      <div className="distraction__options">
        <div className="distraction__option">
          <div
            className="distraction__option--text distraction__option--text-true"
            onClick={() => checkAnswer(challenge.answer, 1)}
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
            onClick={() => checkAnswer(!challenge.answer, 2)}
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
