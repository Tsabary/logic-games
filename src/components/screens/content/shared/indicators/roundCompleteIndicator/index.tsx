import "./styles.scss";
import React, { useEffect, useContext } from "react";

import { ReactComponent as Check } from "../../../../../assets/general/check.svg";
import strings from "../../../../../../constants/localizedStrings";
import { playCorrect } from "../../../../../../sounds/playFunctions";
import { gameInfoContext } from "../../../../../../providers/GameInfo";

const CorrectIndicator = () => {
  const { isSoundOn } = useContext(gameInfoContext);

  useEffect(() => {
    if (isSoundOn) playCorrect.play();
  }, [isSoundOn]);

  return (
    <div className="round-complete">
      <div className="round-complete__check-container">
        <Check className="round-complete__check" />
      </div>
      <div className="round-complete__text">{strings.roundComplete}</div>
    </div>
  );
};

export default CorrectIndicator;
