import "./styles.scss";
import React, { useContext } from "react";
import { gameInfoContext } from "../../../../../providers/GameInfo";
import strings from "../../../../../constants/localizedStrings";

const Score = () => {
  const { score } = useContext(gameInfoContext);

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
