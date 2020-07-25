import "./styles.scss";
import React, { useContext } from "react";
import StartScreen from "./startScreen";
import { GameInfoContext } from "../../../providers/GameInfo";
import DoubleTrouble from "./doubleTrouble";
import GrammaticalReasoning from "./grammaticalReasoning";
import CorsiBlock from "./corsiBlock";
import OperationSpan from "./operationSpan";
import TokenSearch from "./tokenSearch";

const Content = () => {
  const { isPlaying, challenge } = useContext(GameInfoContext);

  const renderChallenge = (chal) => {
    switch (chal) {
      case 0:
        return <DoubleTrouble />;

      case 1:
        return <GrammaticalReasoning />;

      case 2:
        return <CorsiBlock />;

      case 3:
        return <OperationSpan />;

      case 4:
        return <TokenSearch />;

      default:
        return null;
    }
  };

  return (
    <div className="content">
      {isPlaying ? renderChallenge(challenge) : <StartScreen />}
    </div>
  );
};

export default Content;
