import "./styles.scss";
import React, { useContext } from "react";
import Sidebar from "./sidebar";
import Content from "./content";
import { DoubleTroubleContext } from "../../../providers/DoubleTrouble";

const Game = () => {
  const { isDone, isInstructionsVisible } = useContext(DoubleTroubleContext);

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
