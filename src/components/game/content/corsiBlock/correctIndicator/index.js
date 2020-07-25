import "./styles.scss";
import React, { useEffect } from "react";

import { playCorrect } from "../../../../../sounds/playFunctions";
import strings from "../../../../../constants/localizedStrings";
import { ReactComponent as Check } from "../../../../assets/general/check.svg";

const CorrectIndicator = () => {
  useEffect(() => {
    playCorrect.play();
  }, []);

  return (
    <div className="correct-indicator">
      <div className="correct-indicator__check-container">
        <Check className="correct-indicator__check" />
      </div>
      <div className="correct-indicator__text">{strings.roundComplete}</div>
    </div>
  );
};

export default CorrectIndicator;
