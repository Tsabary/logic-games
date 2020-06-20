import "../styles/styles.scss";
import "./styles.scss";
import React from "react";
import { GameInfoProvider } from "../providers/GameInfo";

import Game from "./game";
import Instructions from "./instructions";
import Done from "./done";

const App = () => {
  return (
    <GameInfoProvider>
      <Game />
      <Instructions />
      <Done />
    </GameInfoProvider>
  );
};

export default App;
