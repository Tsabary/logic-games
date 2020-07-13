import "./styles.scss";
import React, { useContext, useEffect } from "react";
import { ReactSVG } from "react-svg";

import strings from "../../../../constants/localizedStrings";
import { GameInfoContext } from "../../../../providers/GameInfo";

const Lives = (livesLost) => {
  const { livesLeft, setIsDone } = useContext(GameInfoContext);

  useEffect(() => {
    if (livesLeft === 0) setIsDone(true);
  }, [livesLeft]);

  const renderLives = () => {
    const lives = [];

    for (let i = 0; i < 3; i++) {
      lives.push(
        <div
          className={
            i < livesLeft
              ? "lives__heart-container lives__heart-container--active"
              : "lives__heart-container lives__heart-container--lost"
          }
        >
          <ReactSVG
            src={
              i < livesLeft ? "../assets/heart.svg" : "../assets/heart_lost.svg"
            }
            wrapper="div"
            // beforeInjection={(svg) => {
            //   svg.classList.add(
            //     i < livesLeft ? "lives__heart--active" : "lives__heart--lost"
            //   );
            // }}
          />
        </div>
      );
    }

    return lives;
  };
  return (
    <div className="lives">
      <div className="lives__icons">{renderLives(livesLeft)}</div>
      <div className="lives__title">{strings.livesRemaining}</div>
    </div>
  );
};

export default Lives;
