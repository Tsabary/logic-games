import "../styles/styles.scss";
import "./styles.scss";
import React from "react";
import { GameInfoProvider } from "../providers/GameInfo";

import Screens from "./screens";

const App = () => {
  return (
    <GameInfoProvider>
      <Screens/>
    </GameInfoProvider>
  );
};

export default App;
