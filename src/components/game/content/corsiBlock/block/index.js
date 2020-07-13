import "./styles.scss";
import React from "react";

import { playClick } from "../../../../../sounds/playFunctions";

const Block = ({ isFlashing, isRunning, registerClick }) => {
  const renderBlockStyle = (flashing, running) => {
    switch (true) {
      case !running:
        return "block block--done";

      case flashing:
        return "block block--flashing";

      case running:
        return "block block--running";

      default:
        return "block block--done";
    }
  };

  return (
    <div
      className={renderBlockStyle(isFlashing, isRunning)}
      onClick={() => {
        if (isRunning) return;
        registerClick();
        playClick.play();
      }}
    />
  );
};

export default Block;
