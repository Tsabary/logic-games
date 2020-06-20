import "./styles.scss";
import React, { useContext } from "react";

import strings from "../../../constants/localizedStrings";
import { ReactSVG } from "react-svg";
import { GameInfoContext } from "../../../providers/GameInfo";

const GrammaticalReasoningInstructions = () => {
  const { setIsInstructionsVisible } = useContext(GameInfoContext);

  return (
    <div className="gr-inst">
      <h1>{strings.instructionsTitle}</h1>
      <h2>
        {strings.grInstructionsLineOne}
        <br />
        {strings.grInstructionsLineTwo}
      </h2>
      <div className="gr-inst__sample-container">
        <div />
        <h1>{strings.grSampleExplain}</h1>
        <div className="gr-inst__sample-text label">{strings.statement}</div>
      </div>

      <div className="gr-inst__illustration-container">
        <div className="gr-inst__illustration-container--square" />
        <div className="gr-inst__illustration-container--square-line" />
        <div className="gr-inst__illustration-container--square-text label">
          square
        </div>
        <div className="gr-inst__illustration-container--circle" />
        <div className="gr-inst__illustration-container--circle-line" />
        <div className="gr-inst__illustration-container--circle-text label">
          circle
        </div>
      </div>

      <div className="gr-inst__options-container">
        <div>
          <div className="gr-inst__options-option">
            <div className="choice choice--red choice--border">
              {strings.false}
            </div>
            <div className="gr-inst__hint-container gr-inst__hint-container--left">
              <div className="gr-inst__hint gr-inst__hint--right">
                <ReactSVG
                  src={"../assets/check.svg"}
                  wrapper="div"
                  beforeInjection={(svg) => {
                    svg.classList.add("gr-inst__hint-icon--right");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="label" style={{ marginTop: "2rem" }}>
            {strings.correctAnswer}
          </div>
        </div>

        <div>
          <div className="gr-inst__options-option">
            <div className="choice choice--green choice--border">
              {strings.true}
            </div>
            <div className="gr-inst__hint-container gr-inst__hint-container--right">
              <div className="gr-inst__hint">
                <ReactSVG
                  src={"../assets/x.svg"}
                  wrapper="div"
                  beforeInjection={(svg) => {
                    svg.classList.add("gr-inst__hint-icon--wrong");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="label" style={{ marginTop: "2rem" }}>
            {strings.wrongAnswer}
          </div>
        </div>
      </div>

      <div
        className="gr-inst__finish"
        onClick={() => setIsInstructionsVisible(false)}
      >
        {strings.iUnderstand}
      </div>
    </div>
  );
};

export default GrammaticalReasoningInstructions;
