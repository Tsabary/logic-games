import "./styles.scss";
import React, { useEffect, useState, useContext } from "react";

import { playClick } from "../../../../../../../sounds/playFunctions";
import { gameInfoContext } from "../../../../../../../providers/GameInfo";

interface BlockProps {
  isFlashing: boolean;
  isRunning: boolean;
  registerClick: () => void;
}

const Block = ({ isFlashing, isRunning, registerClick }: BlockProps) => {
  const { isSoundOn } = useContext(gameInfoContext);

  const [block, setBlock] = useState<JSX.Element>();

  useEffect(() => {
    setBlock(
      <div
        className={getBlockStyle(isFlashing, isRunning)}
        onClick={() => {
          if (isRunning) return;
          registerClick();
          if (isSoundOn) playClick.play();
        }}
      />
    );
  }, [isFlashing, isRunning, setBlock, registerClick, isSoundOn]);

  const getBlockStyle = (flashing: boolean, running: boolean) => {
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

  return block ? block : null;
};

export default Block;
