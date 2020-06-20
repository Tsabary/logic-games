import "./styles.scss";
import React, { useContext } from "react";
import { GameInfoContext } from "../../providers/GameInfo";
import strings from "../../constants/localizedStrings";

const Done = () => {
  const { isDone } = useContext(GameInfoContext);

  return (
    <div className="done" style={{ display: isDone ? "block" : "none" }}>
      <div className="done__container">
        <h1>{strings.thankYou}</h1>
        <h2 style={{ marginTop: "3rem" }}>{strings.thankYouMessage}</h2>
      </div>
    </div>
  );
};

export default Done;
