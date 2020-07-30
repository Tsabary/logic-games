import "./styles.scss";
import React, { useEffect, useState, useContext } from "react";
import RoundCompleteIndicator from "../roundCompleteIndicator";
import LostLifeIndicator from "../lostLifeIndicator";
import { gameInfoContext } from "../../../../../../providers/GameInfo";

interface LostLifeRoundCompleteIndicatorProps {
  makeLevelIndicatorVisible: () => void;
}

const LostLifeRoundCompleteIndicator = ({
  makeLevelIndicatorVisible,
}: LostLifeRoundCompleteIndicatorProps) => {
  const { isLevelSuccessful } = useContext(gameInfoContext);

  const [visibleComponent, setVisibleComponent] = useState<JSX.Element>();

  let visibilityTimeout: NodeJS.Timeout;

  visibilityTimeout = setTimeout(() => {
    makeLevelIndicatorVisible();
  }, 1500);

  useEffect(() => {
    return () => {
      if (visibilityTimeout) clearTimeout(visibilityTimeout);
    };
  }, []);

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
