import "./styles.scss";
import React, { useContext } from "react";
import { GameInfoContext } from "../../providers/GameInfo";
import DoubleTroubleInstructions from "./doubleTrouble";
import GrammaticalReasoningInstructions from "./grammaticalReasoning";

const Instructions = () => {
  const { isInstructionsVisible, challenge } = useContext(GameInfoContext);

  const renderChallengeInstructions = (chal) => {
    switch (chal) {
      case 0:
        return <DoubleTroubleInstructions />;

      case 1:
        return <GrammaticalReasoningInstructions />;
    }
  };

  return (
    <div className="instructions">
      <input
        className="instructions__checkbox"
        type="checkbox"
        checked={isInstructionsVisible}
        readOnly
      />
      <div className="instructions__container">
        {renderChallengeInstructions(challenge)}
      </div>
    </div>
  );
};

export default Instructions;
