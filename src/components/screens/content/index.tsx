import "./styles.scss";
import React, { useContext } from "react";
import Sidebar from "./sidebar";
import Content from "./games";
import { gameInfoContext } from "../../../providers/GameInfo";

const Game = () => {
  const { isDone, isInstructionsVisible } = useContext(gameInfoContext);

  return (
    <div className="content">
      <input
        className="content__checkbox"
        type="checkbox"
        checked={!isDone && !isInstructionsVisible}
        readOnly
      />
      <div className="content__container">
        <Content />
        <Sidebar />
      </div>
    </div>
  );
};

export default Game;
