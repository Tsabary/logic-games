import "../styles/styles.scss";
import "./styles.scss";
import React from "react";
import { GameInfoProvider } from "../providers/GameInfo";

import Game from "./game";
import Instructions from "./instructions";
import Replay from "./replay";

const App = () => {
  return (
    <GameInfoProvider>
      <Game />
      <Instructions />
      <Replay />
    </GameInfoProvider>
  );
};

export default App;
