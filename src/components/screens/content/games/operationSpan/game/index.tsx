import "./styles.scss";
import React, { useState, useRef, useEffect, useContext } from "react";

import { gameInfoContext } from "../../../../../../providers/GameInfo";
import { Functions } from "../../../utils/interfaces";

import {
  makeImageAndChallengeVisible,
  makeReorderVisible,
} from "./utils/functions";

import Reorder from "./reorder";
import ImageAndChallengeSet from "./imageAndChallengeSet";
import { operationSpanContext } from "../../../../../../providers/OperationSpan";

const Game = () => {
  const { level } = useContext(gameInfoContext);
  const { userAnswers, setUserAnswers, setProvidedOrder } = useContext(
    operationSpanContext
  );

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [visibleComponent, setVisibleComponent] = useState<JSX.Element>();

  // This state indicates whether we should be presenting the user with the reordering ccomponent
  const [isReorderingVisible, setIsReorderingVisible] = useState<boolean>(
    false
  );

  const [
    isImageAndChallengeSetVisible,
    setIsImageAndChallengeSetVisible,
  ] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setUserAnswers([]);
      setProvidedOrder([]);
    };
  }, [setUserAnswers, setProvidedOrder]);

  useEffect(() => {
    const makeImageAndChallengeVisibleFn = () => {
      makeImageAndChallengeVisible(
        setIsReorderingVisible,
        setIsImageAndChallengeSetVisible
      );
    };

    const makeReorderVisibleFn = () => {
      makeReorderVisible(
        setIsReorderingVisible,
        setIsImageAndChallengeSetVisible
      );
    };

    setFunctions({
      makeImageAndChallengeVisible: makeImageAndChallengeVisibleFn,
      makeReorderVisible: makeReorderVisibleFn,
    });
  }, [setIsReorderingVisible, setIsImageAndChallengeSetVisible]);

  // Load the first challenge on first render
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);
    functions.makeImageAndChallengeVisible();
  }, [functions, isFirstLoad]);

  useEffect(() => {
    if (!functions) return;

    switch (true) {
      case isImageAndChallengeSetVisible:
        setVisibleComponent(<ImageAndChallengeSet />);
        break;

      case isReorderingVisible:
        setVisibleComponent(<Reorder />);
        break;
    }
  }, [isImageAndChallengeSetVisible, isReorderingVisible, functions]);

  useEffect(() => {
    if (!functions || !userAnswers) return;

    if (level === userAnswers.length) {
      functions.makeReorderVisible();
    }
  }, [level, userAnswers, functions]);

  return functions ? <div className="os-game">{visibleComponent}</div> : null;
};

export default Game;
