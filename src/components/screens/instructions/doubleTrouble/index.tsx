import "./styles.scss";
import React, { useContext } from "react";

import strings from "../../../../constants/localizedStrings";
import { gameInfoContext } from "../../../../providers/GameInfo";
import { ReactComponent as X } from "../../../assets/general/x.svg";
import { ReactComponent as Check } from "../../../assets/general/check.svg";

const DoubleTroubleInstructions = () => {
  const { setIsInstructionsVisible } = useContext(gameInfoContext);

  return (
    <div className="dt-inst">
      <h1>{strings.instructionsTitle}</h1>
      <h2>
        {strings.dtInstructionsLineOne}
        <br />
        {strings.dtInstructionsLineTwo}
        <br />
        {strings.dtInstructionsLineThree}
      </h2>
      <div className="dt-inst__sample-container">
        <div />
        <div className="choice choice--blue">{strings.red}</div>
        <div className="dt-inst__sample-text label">
          {strings.dtSampleExplain}
        </div>
      </div>

      <div className="dt-inst__options-container">
        <div>
          <div className="dt-inst__options-option">
            <div className="choice choice--blue choice--border">
              {strings.red}
            </div>

            <div className="choice__hint-container choice__hint-container--left">
              <div className="choice__hint">
                <X className="choice__hint-icon--wrong" />
              </div>
            </div>
          </div>
          <div className="label" style={{ marginTop: "2rem" }}>
            {strings.wrongAnswer}
          </div>
        </div>

        <div>
          <div className="dt-inst__options-option">
            <div className="choice choice--red choice--border">
              {strings.blue}
            </div>
            <div className="choice__hint-container choice__hint-container--right">
              <div className="choice__hint choice__hint--correct">
                <Check className="choice__hint-icon--correct" />
              </div>
            </div>
          </div>
          <div className="label" style={{ marginTop: "2rem" }}>
            {strings.correctAnswer}
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

export default DoubleTroubleInstructions;
