import "./styles.scss";
import React, { useContext } from "react";
import { gameInfoContext } from "../../../providers/GameInfo";
import strings from "../../../constants/localizedStrings";

const Done = () => {
  const { isDone, accuracy, score, challenge } = useContext(gameInfoContext);

  const doneMessaage = () => {
    switch (challenge) {
      // For the typing test we have a different message
      case 5:
        return (
          <div>
            {`${score} ${strings.wpm}`}
            <br />
            {`${accuracy}% ${strings.accuracy}`}{" "}
          </div>
        );

      // The basic "Your score is" message
      default:
        return `${strings.youScored} ${score}`;
    }
  };

  return (
    <div className="done" style={{ display: isDone ? "block" : "none" }}>
      <div className="done__container">
        <h1>{strings.thankYou}</h1>
        <div className="done__score">{doneMessaage()}</div>
        <h2 style={{ marginTop: "4rem" }}>{strings.thankYouMessage}</h2>
      </div>
    </div>
  );
};

export default Done;
