import "./styles.scss";
import React, { useContext } from "react";
import { gameInfoContext } from "../../../providers/GameInfo";
import strings from "../../../constants/localizedStrings";

const Done = () => {
  const { isDone, score } = useContext(gameInfoContext);

  return (
    <div className="done" style={{ display: isDone ? "block" : "none" }}>
      <div className="done__container">
        <h1>{strings.thankYou}</h1>
        <div className="done__score">
          {strings.youScored} {score}
        </div>
        <h2 style={{ marginTop: "4rem" }}>{strings.thankYouMessage}</h2>
      </div>
    </div>
  );
};

export default Done;
