import "./styles.scss";
import React, { useContext } from "react";
import StartScreen from "./startScreen";
import { DoubleTroubleContext } from "../../../../providers/DoubleTrouble";
import Challenge from "./challenge";

const Content = () => {
  const { isPlaying } = useContext(DoubleTroubleContext);

  return (
    <div className="content">{isPlaying ? <Challenge /> : <StartScreen />}</div>
  );
};

export default Content;
