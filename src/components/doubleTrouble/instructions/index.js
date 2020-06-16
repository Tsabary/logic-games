import "./styles.scss";
import React, { useContext } from "react";
import { ReactSVG } from "react-svg";

import { DoubleTroubleContext } from "../../../providers/DoubleTrouble";
import strings from "../../../constants/localizedStrings";

const Instructions = () => {
  const { isInstructionsVisible, setIsInstructionsVisible } = useContext(
    DoubleTroubleContext
  );

  return (
    <div className="dt-inst">
      <input
        className="dt-inst__checkbox"
        type="checkbox"
        checked={isInstructionsVisible}
        readOnly
      />
      <div className="dt-inst__container">
        <h1>{strings.instructionsTitle}</h1>
        <h2>
          {strings.instructionsLineOne}
          <br />
          {strings.instructionsLineTwo}
          <br />
          {strings.instructionsLineThree}
        </h2>
        <div className="dt-inst__sample-container">
          <div />
          <div className="choice choice--blue">{strings.red}</div>
          <div className="dt-inst__sample-text label">
            {strings.sampleExplain}
          </div>
        </div>

        <div className="dt-inst__options-container">
          <div>
            <div className="dt-inst__options-option">
              <div className="choice choice--blue choice--border">{strings.red}</div>
              <div className="dt-inst__hint-container dt-inst__hint-container--wrong">
                <div className="dt-inst__hint">
                  <ReactSVG
                    src={"../assets/x.svg"}
                    wrapper="div"
                    beforeInjection={(svg) => {
                      svg.classList.add("dt-inst__hint-icon--wrong");
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
              <div className="dt-inst__hint-container dt-inst__hint-container--right">
                <div className="dt-inst__hint dt-inst__hint--right">
                  <ReactSVG
                    src={"../assets/check.svg"}
                    wrapper="div"
                    beforeInjection={(svg) => {
                      svg.classList.add("dt-inst__hint-icon--right");
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
          className="dt-inst__finish"
          onClick={() => setIsInstructionsVisible(false)}
        >
          {strings.iUnderstand}
        </div>
      </div>
    </div>
  );
};

export default Instructions;
