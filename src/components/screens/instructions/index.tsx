import "./styles.scss";
import React, { useContext } from "react";
import { gameInfoContext } from "../../../providers/GameInfo";
import DoubleTroubleInstructions from "./doubleTrouble";
import GrammaticalReasoningInstructions from "./grammaticalReasoning";
import CorsiBlockInstructions from "./corsiBlock";
import OperationSpanInstructions from "./operationSpan";
import TokenSearchInstructions from "./tokenSearch";
import WordsPerMinuteInstructions from "./wordsPerMinute";

const Instructions = () => {
  const { isInstructionsVisible, challenge } = useContext(gameInfoContext);

  const renderChallengeInstructions = (chal: number) => {
    switch (chal) {
      case 0:
        return <DoubleTroubleInstructions />;

      case 1:
        return <GrammaticalReasoningInstructions />;

      case 2:
        return <CorsiBlockInstructions />;

      case 3:
        return <OperationSpanInstructions />;

      case 4:
        return <TokenSearchInstructions />;

      case 5:
        return <WordsPerMinuteInstructions />;

      default:
        return null;
    }
  };

  // Checkbox might be redundent here. It was previously used to control visibility, but conditional rendering as it is ow might be absouately fine. Need to see if it doesn't createany issues, and if it doesn't remove the checkbox conditioning.
  return isInstructionsVisible ? (
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
  ) : null;
};

export default Instructions;
