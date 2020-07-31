import "./styles.scss";
import React, { useContext } from "react";
import { gameInfoContext } from "../../../providers/GameInfo";
import strings from "../../../constants/localizedStrings";

const Replay = () => {
  const {
    isDone,
    score,
    setScore,
    setIsPlaying,
    setIsDone,
    setTimeLeft,
    gameLength,
  } = useContext(gameInfoContext);

  const handleReplay = () => {
    setScore(0);
    setIsPlaying(false);
    setIsDone(false);
    setTimeLeft(gameLength);
  };

  return (
    <div className="replay" style={{ display: isDone ? "block" : "none" }}>
      <div className="replay__container">
        <h1>{strings.youScored}</h1>
        <h1>{score}</h1>

        <div
          className="button button--green"
          onClick={() => handleReplay()}
          style={{ marginTop: "4rem" }}
        >
          {strings.playAgain}
        </div>
      </div>
    </div>
  );
};

export default Replay;
