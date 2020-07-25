import "./styles.scss";
import React, { useContext } from "react";

import strings from "../../../constants/localizedStrings";
import { GameInfoContext } from "../../../providers/GameInfo";

const GrammaticalReasoningInstructions = () => {
  const { setIsInstructionsVisible } = useContext(GameInfoContext);

  return (
    <div className="gr-inst">
      <h1>{strings.instructionsTitle}</h1>
      <h2>
        {strings.cbInstructionsLineOne}
        <br />
        {strings.cbInstructionsLineTwo}
      </h2>

      <div className="cb-inst__samples-container">

        <div className="cb-inst__samples-block cb-inst__samples-block--running" />
        <div className="cb-inst__samples-text">
          <div className="cb-inst__samples-title">
            {strings.cbStateOneTitle}
          </div>
          <div className="cb-inst__samples-order">
            {strings.cbStateOneOrder}
          </div>
        </div>

        
        <div className="cb-inst__samples-block cb-inst__samples-block--done" />
        <div className="cb-inst__samples-text">
          <div className="cb-inst__samples-title">
            {strings.cbStateTwoTitle}
          </div>
          <div className="cb-inst__samples-order">
            {strings.cbStateTwoOrder}
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
