import "./styles.scss";
import React, { useContext } from "react";

import Content from "./content";
import Instructions from "./instructions";
import Done from "./done";
import { gameInfoContext } from "../../providers/GameInfo";

const Screens = () => {
  const { isDone } = useContext(gameInfoContext);

  return !isDone ? (
    <div className="screens">
      <Content />
      <Instructions />
    </div>
  ) : (
    <div className="screens">
      <Done />
    </div>
  );
};

export default Screens;
