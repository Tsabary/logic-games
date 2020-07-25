import "./styles.scss";
import React, { useContext } from "react";
import Sidebar from "./sidebar";
import Content from "./content";
import { GameInfoContext } from "../../providers/GameInfo";

const Game = () => {
  const { isDone, isInstructionsVisible } = useContext(GameInfoContext);

  return (
    <div className="game">
      <input
        className="game__checkbox"
        type="checkbox"
        checked={!isDone && !isInstructionsVisible}
        readOnly
      />
      <div className="game__container">
        <Content />
        <Sidebar />
      </div>
    </div>
  );
};

export default Game;
