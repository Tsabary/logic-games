import "./styles.scss";
import React, { useEffect, useState, useContext } from "react";
import { ReactComponent as X } from "../../../../assets/general/x.svg";
import { ReactComponent as Check } from "../../../../assets/general/check.svg";
import strings from "../../../../../constants/localizedStrings";
import { GameInfoContext } from "../../../../../providers/GameInfo";

interface LevelIndicatorProps {
  isSuccessful: number;
  level: number;
}

const NewLevelIndicator = ({ isSuccessful, level }: LevelIndicatorProps) => {
  const { fails, fouls } = useContext(GameInfoContext);
  const [livesLeft, setLivesLeft] = useState(3);

  const [isLevelVisible, setIsLevelVisible] = useState(false);
  const [isSuccessIndicatorVisible, setIsSuccessIndicatorVisible] = useState(
    false
  );

  useEffect(() => {
    const totalBadPoints = fails * 2 + fouls;
    setLivesLeft(Math.floor((6 - totalBadPoints) / 2));
  }, [fails, fouls]);

  useEffect(() => {
    // isSuccessful has one of three states:
    // 0: is the default that we start with. THis means that this is the first round, so we don't need to show any success indicator
    // 1: indicates that the round was successful
    // 2: indicates that the round was not successful
    if (isSuccessful) {
      setIsSuccessIndicatorVisible(true);
      setIsLevelVisible(false);
      setTimeout(() => {
        setIsSuccessIndicatorVisible(false);
        setIsLevelVisible(true);
      }, 1500);
    } else {
      setIsLevelVisible(true);
    }
  }, [isSuccessful]);

  const renderSuccessIndicator = (isSuccessful: number): JSX.Element | null => {
    switch (isSuccessful) {
      case 1:
        return (
          <div className="new-level__indicator-container">
            <div className="new-level__indicator-icon new-level__indicator-icon--success">
              <Check style={{ fill: "#89c92e" }} />
            </div>
            <div className="new-level__indicator-text new-level__indicator-text--success">
              {strings.roundComplete}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="new-level__indicator-container">
            <div className="new-level__indicator-icon new-level__indicator-icon--fail">
              <X style={{ fill: "#ff0302" }} />
            </div>
            <div className="new-level__indicator-text new-level__indicator-text--fail">
              {livesLeft > 1
                ? `${livesLeft} ${strings.livesLeft}`
                : `1 ${strings.lifeLeft}`}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderContent = (
    level: number,
    isSuccessful: number,
    isLevelVisible: boolean,
    isSuccessIndicatorVisible: boolean
  ) => {
    switch (true) {
      case isLevelVisible && !isSuccessIndicatorVisible:
        return level > 1
          ? `${level} ${strings.boxes}`
          : `${level} ${strings.box}`;

      case isSuccessIndicatorVisible && !isLevelVisible:
        return renderSuccessIndicator(isSuccessful);

      default:
        return null;
    }
  };

  return (
    <div className="new-level">
      {renderContent(
        level,
        isSuccessful,
        isLevelVisible,
        isSuccessIndicatorVisible
      )}
    </div>
  );
};

export default NewLevelIndicator;
