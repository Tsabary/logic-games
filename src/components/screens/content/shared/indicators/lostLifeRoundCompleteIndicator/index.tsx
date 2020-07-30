import "./styles.scss";
import React, { useEffect, useState, useContext } from "react";
import RoundCompleteIndicator from "../roundCompleteIndicator";
import LostLifeIndicator from "../lostLifeIndicator";
import { gameInfoContext } from "../../../../../../providers/GameInfo";
import { Functions } from "../../../utils/interfaces";
import { stopCounting } from "../../../games/utils/functions";

interface LostLifeRoundCompleteIndicatorProps {
  makeLevelIndicatorVisible: () => void;
}

const LostLifeRoundCompleteIndicator = ({
  makeLevelIndicatorVisible,
}: LostLifeRoundCompleteIndicatorProps) => {
  const {
    isLevelSuccessful,
    setActionStartTime,
    setTimePerAction,
    setIsActionTimerRunning,
  } = useContext(gameInfoContext);

  const [functions, setFunctions] = useState<Functions>();

  const [visibleComponent, setVisibleComponent] = useState<JSX.Element>();

  let visibilityTimeout: NodeJS.Timeout;

  visibilityTimeout = setTimeout(() => {
    makeLevelIndicatorVisible();
  }, 1500);

  useEffect(() => {
    const stopCountingFn = () => {
      stopCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning
      );
    };

    setFunctions({ stopCounting: stopCountingFn });
  }, [setActionStartTime, setTimePerAction, setIsActionTimerRunning]);

  useEffect(() => {
    if (!functions) return;

    functions.stopCounting();

    return () => {
      if (visibilityTimeout) clearTimeout(visibilityTimeout);
    };
  }, [functions, visibilityTimeout]);

  useEffect(() => {
    setVisibleComponent(
      isLevelSuccessful ? <RoundCompleteIndicator /> : <LostLifeIndicator />
    );
  }, [isLevelSuccessful, setVisibleComponent]);

  return (
    <div className="lost-life-round-complete-indicator">{visibleComponent}</div>
  );
};

export default LostLifeRoundCompleteIndicator;
