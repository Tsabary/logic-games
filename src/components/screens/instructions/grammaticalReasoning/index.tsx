import "./styles.scss";
import React, { useContext } from "react";

import strings from "../../../../constants/localizedStrings";
import { gameInfoContext } from "../../../../providers/GameInfo";
import { ReactComponent as X } from "../../../assets/general/x.svg";
import { ReactComponent as Check } from "../../../assets/general/check.svg";

const GrammaticalReasoningInstructions = () => {
  const { setIsInstructionsVisible } = useContext(gameInfoContext);

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
            <div className="choice__hint-container choice__hint-container--left">
              <div className="choice__hint choice__hint--correct">
                <Check className="choice__hint-icon--correct" />
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
            <div className="choice__hint-container choice__hint-container--right">
              <div className="choice__hint">
                <X className="choice__hint-icon--wrong" />
              </div>
            </div>
          </div>
          <div className="label" style={{ marginTop: "2rem" }}>
            {strings.wrongAnswer}
          </div>
        </div>
      </div>

      <div
        className="button button--green"
        onClick={() => setIsInstructionsVisible(false)}
      >
        {strings.iUnderstand}
      </div>
    </div>
  );
};

export default GrammaticalReasoningInstructions;
