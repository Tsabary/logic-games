import "./styles.scss";
import React, { useState, useEffect, useContext } from "react";

import Board from "./board";
import LostLifeRoundCompleteIndicatorProps from "../../shared/indicators/lostLifeRoundCompleteIndicator";
import LevelIndicator from "../../shared/indicators/levelIndicator";
import { gameInfoContext } from "../../../../../providers/GameInfo";
import { Functions } from "../../utils/interfaces";
import strings from "../../../../../constants/localizedStrings";

const CorsiBlock = () => {
  const { setLevel } = useContext(gameInfoContext);

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [isSuccessIndicatorShowing, setIsSuccessIndicatorShowing] = useState<
    boolean
  >(false);
  const [isLevelIndicatorShowing, setIsLevelIndicatorShowing] = useState<
    boolean
  >(false);
  const [isGameBoardShowing, setIsGameBoardShowing] = useState<boolean>(false);

  useEffect(() => {
    const makeLevelIndicatorVisibleFn = () => {
      setIsLevelIndicatorShowing(true);
      setIsSuccessIndicatorShowing(false);
      setIsGameBoardShowing(false);
    };

    const makeSuccessIndicatorVisibleFn = () => {
      setIsLevelIndicatorShowing(false);
      setIsSuccessIndicatorShowing(true);
      setIsGameBoardShowing(false);
    };

    const makeGameBoardVisibleFn = () => {
      setIsLevelIndicatorShowing(false);
      setIsSuccessIndicatorShowing(false);
      setIsGameBoardShowing(true);
    };

    setFunctions({
      makeLevelIndicatorVisible: makeLevelIndicatorVisibleFn,
      makeSuccessIndicatorVisible: makeSuccessIndicatorVisibleFn,
      makeGameBoardVisible: makeGameBoardVisibleFn,
    });
  }, []);

  // Load the first challenge on first render
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);
    setLevel(4);
    functions.makeLevelIndicatorVisible();
  }, [functions, isFirstLoad, setLevel]);

  // Our main render function
  const renderContent = (
    isGameBoardShowing: boolean,
    isLevelIndicatorShowing: boolean,
    isSuccessIndicatorShowing: boolean
  ) => {
    switch (true) {
      case isGameBoardShowing &&
        !isLevelIndicatorShowing &&
        !isSuccessIndicatorShowing:
        return (
          <Board
            makeSuccessIndicatorVisible={functions!.makeSuccessIndicatorVisible}
          />
        );

      case isLevelIndicatorShowing &&
        !isSuccessIndicatorShowing &&
        !isGameBoardShowing:
        return (
          <LevelIndicator
            makeGameVisible={functions!.makeGameBoardVisible}
            units={strings.blocks}
            unit={strings.block}
          />
        );

      case isSuccessIndicatorShowing &&
        !isGameBoardShowing &&
        !isLevelIndicatorShowing:
        return (
          <LostLifeRoundCompleteIndicatorProps
            makeLevelIndicatorVisible={functions!.makeLevelIndicatorVisible}
          />
        );
    }
  };

  if (!functions) return null;

  return (
    <div className="corsi-block">
      {renderContent(
        isGameBoardShowing,
        isLevelIndicatorShowing,
        isSuccessIndicatorShowing
      )}
    </div>
  );
};

export default CorsiBlock;
