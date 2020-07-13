import "./styles.scss";
import React, { useEffect } from "react";

import { ReactSVG } from "react-svg";

import { playCorrect } from "../../../../../sounds/playFunctions";

const CorrectIndicator = () => {
  useEffect(() => {
    playCorrect.play();
  }, []);

  return (
    <div className="correct-indicator">
      <div className="correct-indicator__check-container">
        <ReactSVG
          src="../assets/check.svg"
          wrapper="div"
          beforeInjection={(svg) => {
            svg.classList.add("correct-indicator__check");
          }}
        />
      </div>
      <div className="correct-indicator__text">Round complete!</div>
    </div>
  );
};

export default CorrectIndicator;
