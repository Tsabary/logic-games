import "./styles.scss";
import React, { useEffect, useState, useContext } from "react";
import { ReactComponent as X } from "../../../../../assets/general/x.svg";
import { ReactComponent as Check } from "../../../../../assets/general/check.svg";
import strings from "../../../../../../constants/localizedStrings";
import { gameInfoContext } from "../../../../../../providers/GameInfo";

export interface NewLevelIndicatorProps {
  level: number;
  makeImageVisible: () => void;
}

const NewLevelIndicator = ({
  level,
  makeImageVisible,
}: NewLevelIndicatorProps) => {
  const { fails, isLevelSuccessful } = useContext(gameInfoContext);

  const [isShowingNewLevel, setIsShowingNewLevel] = useState(true);

  let visibilityTimeout: NodeJS.Timeout;

  visibilityTimeout = setTimeout(() => {
    console.log("MAKING THE IMAGE VISIBLE");
    makeImageVisible();
  }, 3000);

  useEffect(() => {
    return () => {
      if (visibilityTimeout) clearTimeout(visibilityTimeout);
    };
  }, []);

  useEffect(() => {
    // isSuccessful has one of three states:
    // 0: is the default that we start with. THis means that this is the first round, so we don't need to show any success indicator
    // 1: indicates that the round was successful
    // 2: indicates that the round was not successful
    if (isLevelSuccessful) setIsShowingNewLevel(false);

    setTimeout(() => {
      setIsShowingNewLevel(true);
    }, 1500);
  }, [isLevelSuccessful]);

  const renderSuccessIndicator = (isSuccessful: boolean) => {
    if (isSuccessful) {
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
    } else {
      return (
        <div className="new-level__indicator-container">
          <div className="new-level__indicator-icon new-level__indicator-icon--fail">
            <X style={{ fill: "#ff0302" }} />
          </div>
          <div className="new-level__indicator-text new-level__indicator-text--fail">
            {3 - fails > 1
              ? `${3 - fails} ${strings.livesLeft}`
              : `1 ${strings.lifeLeft}`}
          </div>
        </div>
      );
    }
  };

  const renderLevelMessage = (level: number) => {
    return level > 1
      ? `${level} ${strings.images}`
      : `${level} ${strings.image}`;
  };

  return (
    <div className="new-level">
      {isShowingNewLevel
        ? renderLevelMessage(level)
        : renderSuccessIndicator(isLevelSuccessful)}
    </div>
  );
};

export default NewLevelIndicator;
