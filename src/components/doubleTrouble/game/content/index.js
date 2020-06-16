import "./styles.scss";
import React, { useContext } from "react";
import StartScreen from "./startScreen";
import { DoubleTroubleContext } from "../../../../providers/DoubleTrouble";
import Challenge from "./challenge";

const Content = () => {
  const renderRays = () => {
    let rays = [];
    for (let i = 0; i < 10; i++) {
      rays.push(
        <div className="sun-light">
          <b></b>
          <s></s>
        </div>
      );
    }

    return rays;
  };
  const { isPlaying } = useContext(DoubleTroubleContext);

  return (
    <div className="content">
       {/* {renderRays()} */}
      {isPlaying ? <Challenge /> : <StartScreen />}
    </div>
  );
};

export default Content;
