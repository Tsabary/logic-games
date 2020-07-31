import "./styles.scss";
import React, { useContext, useEffect } from "react";

import { ReactComponent as X } from "../../../../../assets/general/x.svg";
import strings from "../../../../../../constants/localizedStrings";
import { playWrong } from "../../../../../../sounds/playFunctions";
import { gameInfoContext } from "../../../../../../providers/GameInfo";

const LostLifeIndicator = () => {
  const { fails, isSoundOn } = useContext(gameInfoContext);

  useEffect(() => {
    if (isSoundOn) playWrong.play();
  }, [isSoundOn]);

  return (
    <div className="lost-life-indicator">
      <div className="lost-life-indicator__check-container">
        <X className="lost-life-indicator__check" />
      </div>
      <div className="lost-life-indicator__text">
        {3 - fails > 1
          ? `${3 - fails} ${strings.livesLeft}`
          : `1 ${strings.lifeLeft}`}
      </div>
    </div>
  );
};

export default LostLifeIndicator;
