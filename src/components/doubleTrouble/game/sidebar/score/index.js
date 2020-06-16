import "./styles.scss";
import React, { useContext } from "react";
import { DoubleTroubleContext } from "../../../../../providers/DoubleTrouble";
import strings from "../../../../../constants/localizedStrings";

const Score = () => {
  const { score } = useContext(DoubleTroubleContext);
  return (
    <div className="score">
      <div className="label">{strings.score}</div>
      <div className="sidebar__label" style={{ marginTop: "-.5rem" }}>
        {score}
      </div>
    </div>
  );
};

export default Score;
