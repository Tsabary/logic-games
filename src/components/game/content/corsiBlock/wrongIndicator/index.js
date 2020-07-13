import "./styles.scss";
import React, { useContext, useEffect } from "react";
import { ReactSVG } from "react-svg";

import { GameInfoContext } from "../../../../../providers/GameInfo";
import { playWrong } from "../../../../../sounds/playFunctions";
import strings from "../../../../../constants/localizedStrings";

const WrongIndicator = () => {
  const { livesLeft } = useContext(GameInfoContext);

  useEffect(() => {
    playWrong.play();
  }, []);

  return (
    <div className="wrong-indicator">
      <div className="wrong-indicator__check-container">
        <ReactSVG
          src="../assets/x.svg"
          wrapper="div"
          beforeInjection={(svg) => {
            svg.classList.add("wrong-indicator__check");
          }}
        />
      </div>
      <div className="wrong-indicator__text">
        {livesLeft} {strings.livesLeft}
      </div>
    </div>
  );
};

export default WrongIndicator;
