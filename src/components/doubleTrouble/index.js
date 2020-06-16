import "./styles.scss";
import React, { useState } from "react";
import Instructions from "./instructions";
import Done from "./done";
import Game from "./game";

const DoubleTrouble = () => {
  return (
    <div className="dt">
      <Game />
      <Instructions />
      <Done />
    </div>
  );
};

export default DoubleTrouble;
