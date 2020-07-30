import "./styles.scss";
import React, { useState, useEffect, useContext } from "react";

import { Functions } from "../../utils/interfaces";

import {
  makeLevelIndicatorVisible,
  makeSuccessIndicatorVisible,
  makeGameVisible,
} from "./utils/functions";

import LostLifeRoundCompleteIndicator from "../../shared/indicators/lostLifeRoundCompleteIndicator";
import LevelIndicator from "../../shared/indicators/levelIndicator";
import Game from "./game";
import { gameInfoContext } from "../../../../../providers/GameInfo";
import strings from "../../../../../constants/localizedStrings";

export default () => {
  const { level, setLevel, isLevelSuccessful } = useContext(gameInfoContext);

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [visibleComponent, setVisibleComponent] = useState<JSX.Element>();

  const [isLevelIndicatorVisible, setIsLevelIndicatorVisible] = useState(false);
  const [isSuccessIndicatorVisible, setIsSuccessIndicatorVisible] = useState(
    false
  );
  const [isGameVisible, setIsGameVisible] = useState(false);

  // Set the functions object which holds all of our actions
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

    setFunctions({
      makeGameVisible: makeGameVisibleFn,
      makeLevelIndicatorVisible: makeLevelIndicatorVisibleFn,
      makeSuccessIndicatorVisible: makeSuccessIndicatorVisibleFn,
    });
  }, []);

  useEffect(() => {
    if (!functions) return;

    switch (true) {
      case isLevelIndicatorVisible:
        setVisibleComponent(
          <LevelIndicator
            unit={strings.image}
            units={strings.images}
            makeGameVisible={functions.makeGameVisible}
          />
        );
        break;

      case isGameVisible:
        setVisibleComponent(<Game />);
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

  // Load the first challenge on first render
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);
    setLevel(2);
  }, [functions, isFirstLoad, setLevel]);

  useEffect(() => {
    console.log(`THIS IS TRIGERED AND THE LEVEL IS`, level);
    if (!functions || level < 0) return;

    if (typeof isLevelSuccessful === "undefined") {
      functions.makeLevelIndicatorVisible();
      console.log(`THIS IS TRIGERED because this is the first time`, level);

    } else {
      functions.makeSuccessIndicatorVisible();
      console.log(`THIS IS TRIGERED because this is NOT the first time`, level);

    }
  }, [level, isLevelSuccessful, functions]);

  return functions ? (
    <div className="operation-span">{visibleComponent}</div>
  ) : null;
};
