import "./styles.scss";
import React, { useContext, useState, useEffect } from "react";
import { gameInfoContext } from "../../../../../providers/GameInfo";

import { Functions } from "../../utils/interfaces";

import {
  makeLevelIndicatorVisible,
  makeGameVisible,
  makeSuccessIndicatorVisible,
} from "./utils/functions";

import NewLevelIndicator from "../../shared/indicators/levelIndicator";
import LostLifeRoundCompleteIndicator from "../../shared/indicators/lostLifeRoundCompleteIndicator";
import Board from "./board";
import { stopCounting } from "../utils/functions";
import strings from "../../../../../constants/localizedStrings";

export default () => {
  const {
    setActionStartTime,
    setTimePerAction,
    setIsActionTimerRunning,
    level,
    setLevel,
    isLevelSuccessful,
  } = useContext(gameInfoContext);

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [visibleComponent, setVisibleComponent] = useState<JSX.Element>();

  const [isLevelIndicatorVisible, setIsLevelIndicatorVisible] = useState(false);
  const [isSuccessIndicatorVisible, setIsSuccessIndicatorVisible] = useState(
    false
  );
  const [isGameVisible, setIsGameVisible] = useState(false);

  useEffect(() => {
    const makeGameVisibleFn = () =>
      makeGameVisible(
        setIsLevelIndicatorVisible,
        setIsGameVisible,
        setIsSuccessIndicatorVisible
      );

    const makeLevelIndicatorVisibleFn = () =>
      makeLevelIndicatorVisible(
        setIsLevelIndicatorVisible,
        setIsGameVisible,
        setIsSuccessIndicatorVisible
      );

    const makeSuccessIndicatorVisibleFn = () =>
      makeSuccessIndicatorVisible(
        setIsLevelIndicatorVisible,
        setIsGameVisible,
        setIsSuccessIndicatorVisible
      );

    const stopCountingFn = () =>
      stopCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning
      );

    setFunctions({
      makeGameVisible: makeGameVisibleFn,
      makeLevelIndicatorVisible: makeLevelIndicatorVisibleFn,
      makeSuccessIndicatorVisible: makeSuccessIndicatorVisibleFn,
      stopCounting: stopCountingFn,
    });
  }, [setActionStartTime, setTimePerAction, setIsActionTimerRunning]);

  // Load the first challenge on first render
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);
    setLevel(4);
  }, [functions, isFirstLoad, setLevel]);

  useEffect(() => {
    if (!functions || level < 0) return;

    functions.stopCounting();
    if (typeof isLevelSuccessful === "undefined") {
      functions.makeLevelIndicatorVisible();
    } else {
      functions.makeSuccessIndicatorVisible();
    }
  }, [level, isLevelSuccessful, functions]);

  useEffect(() => {
    if (!functions) return;

    switch (true) {
      case isLevelIndicatorVisible:
        setVisibleComponent(
          <NewLevelIndicator
            units={strings.blocks}
            unit={strings.block}
            makeGameVisible={functions.makeGameVisible}
          />
        );
        break;

      case isGameVisible:
        setVisibleComponent(
          <Board
            makeSuccessIndicatorVisible={functions.makeSuccessIndicatorVisible}
          />
        );
        break;

      case isSuccessIndicatorVisible:
        setVisibleComponent(
          <LostLifeRoundCompleteIndicator
            makeLevelIndicatorVisible={functions.makeLevelIndicatorVisible}
          />
        );
        break;
    }
  }, [
    isLevelIndicatorVisible,
    isGameVisible,
    isSuccessIndicatorVisible,
    functions,
  ]);

  return functions ? (
    <div className="token-search">{visibleComponent}</div>
  ) : null;
};
