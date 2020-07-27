import "./styles.scss";
import React, { useContext, useEffect } from "react";

import strings from "../../../../constants/localizedStrings";
import { GameInfoContext } from "../../../../providers/GameInfo";

import HeartFull from "./heartActive";
import HeartLost from "./heartLost";
import HeartHalf from "./heartHalf";

const Lives = () => {
  const { setIsDone, fails, fouls } = useContext(GameInfoContext);

  useEffect(() => {
    const totalBadPoints = fails * 2 + fouls.length;

    if (totalBadPoints === 6) {
      setIsDone(true);
      return;
    }
  }, [fails, fouls, setIsDone]);

  const renderLives = (fails, fouls) => {
    const lives = [];
    const totalBadPoints = fails * 2 + fouls.length;

    for (let i = 1; i < 4; i++) {
      /**
       * For each of the three hearts, we dcided if it's a full heart, an empty heart or half a heart
       */
      switch (true) {
        case (6 - totalBadPoints) / 2 >= i:
          lives.push(<HeartFull key={i} />);
          break;

        case (7 - totalBadPoints) / 2 === i:
          lives.push(<HeartHalf key={i} />);
          break;

        case (6 - totalBadPoints) / 2 < i:
        default:
          lives.push(<HeartLost key={i} />);
      }
    }

    return lives;
  };
  return (
    <div className="lives">
      <div className="lives__icons">{renderLives(fails, fouls)}</div>
      <div className="lives__title">{strings.livesRemaining}</div>
    </div>
  );
};

export default Lives;
