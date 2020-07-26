import "./styles.scss";
import React, { useContext, useEffect } from "react";

import strings from "../../../../constants/localizedStrings";
import { GameInfoContext } from "../../../../providers/GameInfo";

import Heart from "./heartActive";
import HeartLost from "./heartLost";
import HeartHalf from "./heartHalf";

const Lives = () => {
  const { livesLeft, setIsDone, fails } = useContext(GameInfoContext);

  useEffect(() => {
    if (livesLeft === 0) setIsDone(true);
  }, [livesLeft, setIsDone]);

  const renderLives = (livesLeft, fails) => {
    const lives = [];

    for (let i = 0; i < 3; i++) {
      switch (true) {
        // If we have no fouls, this is either a full heart or a lost heart. If the index of this heart is smaller than how many lives we have left, then it must be a full heart
        case fails % 2 === 0 && i < livesLeft:
          lives.push(<Heart key={i} />);
          break;

        // If we have fouls, then this is could be either of the three hearts. If this index plus 1 is still smaller than how many lives we have left, then we know that this is for certain a full heart.
        case fails % 2 === 1 && i + 1 < livesLeft:
          lives.push(<Heart key={i} />);
          break;

        // If we have fouls, then this is could be either of the three hearts. if this index plus 1 is equal to how many lives we have left, then we know that this should be the half life.
        case fails % 2 === 1 && i + 1 === livesLeft:
          lives.push(<HeartHalf key={i} />);
          break;

        // If the index of this heart is bigger or equal to how many livs we have left, then it must be a lost life. Also set it as default as there aer no other options
        case i >= livesLeft:
        default:
          lives.push(<HeartLost key={i} />);
          break;
      }
    }

    return lives;
  };
  return (
    <div className="lives">
      <div className="lives__icons">{renderLives(livesLeft, fails)}</div>
      <div className="lives__title">{strings.livesRemaining}</div>
    </div>
  );
};

export default Lives;
