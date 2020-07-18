import "./styles.scss";
import React, { useEffect, useState, useContext } from "react";
import { ReactComponent as X } from "../../../../assets/x.svg";
import { ReactComponent as Check } from "../../../../assets/check.svg";
import strings from "../../../../../constants/localizedStrings";
import { GameInfoContext } from "../../../../../providers/GameInfo";

const NewLevelIndicator = ({ isSuccessful, level }) => {
  const { livesLeft } = useContext(GameInfoContext);

  const [isShowingNewLevel, setIsShowingNewLevel] = useState(true);

  useEffect(() => {
    // isSuccessful has one of three states:
    // 0: is the default that we start with. THis means that this is the first round, so we don't need to show any success indicator
    // 1: indicates that the round was successful
    // 2: indicates that the round was not successful
    if (isSuccessful) setIsShowingNewLevel(false);

    setTimeout(() => {
      setIsShowingNewLevel(true);
    }, [1500]);
  }, [isSuccessful]);

  const renderSuccessIndicator = (isSuccessful) => {
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

  const renderLevelMessage = (level) => {
    return level > 1
      ? `${level} ${strings.images}`
      : `${level} ${strings.image}`;
  };

  return <div>jjjjjjjjjjjjjjjjjjjjjjjjjj</div>

  return (
    <div className="new-level">
      {isShowingNewLevel
        ? renderLevelMessage(level)
        : renderSuccessIndicator(isSuccessful)}
    </div>
  );
};

export default NewLevelIndicator;
