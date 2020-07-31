import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import StartScreen from "../shared/startScreen";
import { gameInfoContext } from "../../../../providers/GameInfo";
import DoubleTrouble from "./doubleTrouble";
import GrammaticalReasoning from "./grammaticalReasoning";
import CorsiBlock from "./corsiBlock";
import OperationSpan from "./operationSpan";
import TokenSearch from "./tokenSearch";
import { OperationSpanProvider } from "../../../../providers/OperationSpan";
import { TokenSearchProvider } from "../../../../providers/TokenSearch";

const Games = () => {
  const { isPlaying, challenge } = useContext(gameInfoContext);
  const [gameComponent, setGameComponent] = useState<JSX.Element>();

  useEffect(() => {
    if (!isPlaying) {
      setGameComponent(<StartScreen />);
      return;
    }

    switch (challenge) {
      case 0:
        setGameComponent(<DoubleTrouble />);
        break;

      case 1:
        setGameComponent(<GrammaticalReasoning />);
        break;

      case 2:
        setGameComponent(<CorsiBlock />);
        break;

      case 3:
        setGameComponent(
          <OperationSpanProvider>
            <OperationSpan />
          </OperationSpanProvider>
        );
        break;

      case 4:
        setGameComponent(
          <TokenSearchProvider>
            <TokenSearch />
          </TokenSearchProvider>
        );
        break;
    }
  }, [isPlaying, challenge]);

  return <div className="games">{gameComponent}</div>;
};

export default Games;
