import "./styles.scss";
import React, { useContext } from "react";

import strings from "../../../constants/localizedStrings";
import { ReactSVG } from "react-svg";
import { GameInfoContext } from "../../../providers/GameInfo";

const DoubleTroubleInstructions = () => {
  const { setIsInstructionsVisible } = useContext(GameInfoContext);

  return (
    <div className="dt-inst">
      <h1>{strings.dtInstructionsTitle}</h1>
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
                <ReactSVG
                  src={"../assets/x.svg"}
                  wrapper="div"
                  beforeInjection={(svg) => {
                    svg.classList.add("choice__hint-icon--wrong");
                  }}
                />
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
                <ReactSVG
                  src={"../assets/check.svg"}
                  wrapper="div"
                  beforeInjection={(svg) => {
                    svg.classList.add("choice__hint-icon--correct");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="label" style={{ marginTop: "2rem" }}>
            {strings.correctAnswer}
          </div>
        </div>
      </div>

      <div
        className="instructions__finish"
        onClick={() => setIsInstructionsVisible(false)}
      >
        {strings.iUnderstand}
      </div>
    </div>
  );
};

export default DoubleTroubleInstructions;
