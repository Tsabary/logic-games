import "./styles.scss";
import React, { useContext, useEffect } from "react";

import { GameInfoContext } from "../../../../../providers/GameInfo";
import { playWrong } from "../../../../../sounds/playFunctions";
import strings from "../../../../../constants/localizedStrings";
import { ReactComponent as X } from "../../../../assets/general/x.svg";

const WrongIndicator = () => {
  const { livesLeft } = useContext(GameInfoContext);

  useEffect(() => {
    playWrong.play();
  }, []);

  return (
    <div className="wrong-indicator">
      <div className="wrong-indicator__check-container">
        <X className="wrong-indicator__check" />
      </div>
      <div className="wrong-indicator__text">
        {livesLeft} {strings.livesLeft}
      </div>
    </div>
  );
};

export default WrongIndicator;
