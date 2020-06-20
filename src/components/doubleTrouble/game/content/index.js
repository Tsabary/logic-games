import "./styles.scss";
import React, { useContext } from "react";
import StartScreen from "./startScreen";
import { DoubleTroubleContext } from "../../../../providers/DoubleTrouble";
import DoubleTrouble from "./challenges/doubleTrouble";
 

const Content = () => {
  const { isPlaying } = useContext(DoubleTroubleContext);

  return (
    <div className="content">{isPlaying ? <DoubleTrouble /> : <StartScreen />}</div>
  );
};

export default Content;
