import React, { useState, useEffect, useContext, useRef } from "react";
import "./styles.scss";

import Box from "./box";
import FillerBox from "./fillerBox";

// These are functions that are shared between different games
import {
  startCounting,
  stopCounting,
  setFirstRound,
} from "../../utils/functions";
import { gameInfoContext } from "../../../../../../providers/GameInfo";
import { newPattern } from "./utils/functions";
import { Functions } from "../../../utils/interfaces";
import { tokenSearchContext } from "../../../../../../providers/TokenSearch";

/**
 * LEVEL HAS:
 * - One order to the boxes.
 * - All tokens must be found (as many tokens as box - the same as the current level).
 * - If we find all tokens, we jump a level.
 * - If we make a mistake of clicking a box in which we've already found a token previosly, we drop a level.
 */

/**
 * ROUND HAS:
 * - One token hidden and needs to be found
 * - Each box could be clicked maximum once
 * - If the token is found we start a new round
 * - If we click a box that we've previously clicked in this round, we drop a level
 */

interface BoardProps {
  makeSuccessIndicatorVisible: () => void;
}

export default ({ makeSuccessIndicatorVisible }: BoardProps) => {
  const {
    setTimePerAction,
    setActionStartTime,
    setIsActionTimerRunning,
    level,
    setLevel,
    setIsLevelSuccessful,
    round,
    setRound,
  } = useContext(gameInfoContext);

  const {
    pattern,
    setPattern,
    setDiscoveredTokens,
    tokenPlacement,
    setTokenPlacement,
    setRoundGuesses,
  } = useContext(tokenSearchContext);

  const [functions, setFunctions] = useState<Functions>();

  const [boxes, setBoxes] = useState<JSX.Element[]>();

  const previousLevel = useRef();

  const previousPattern: { current: number[] | undefined } = useRef();

  useEffect(() => {
    const startCountingFn = () => {
      startCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning,
        5
      );
    };

    const stopCountingFn = () => {
      stopCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning
      );
    };

    const setFirstRoundFn = () => {
      setFirstRound(setRound);
    };

    const newPatternFn = () => {
      newPattern(level, setPattern);
    };

    const resetRoundGuessesFn = () => {
      setRoundGuesses([]);
    };

    const resetDiscoveredTokensFn = () => {
      setDiscoveredTokens([]);
    };

    // Place the token somewhere new. Because of they way we've generated the pattern which created a randomized list of all the boxes that ar part of the pattern, simply moving to the next element would give us a good unpredictable next place for our token
    const setTokenPlacementFn = () => {
      setTokenPlacement(pattern[round - 1]);
    };

    setFunctions({
      startCounting: startCountingFn,
      stopCounting: stopCountingFn,
      setFirstRound: setFirstRoundFn,
      newPattern: newPatternFn,
      resetRoundGuesses: resetRoundGuessesFn,
      resetDiscoveredTokens: resetDiscoveredTokensFn,
      setTokenPlacement: setTokenPlacementFn,
    });
  }, [
    setActionStartTime,
    setTimePerAction,
    setIsActionTimerRunning,
    setIsLevelSuccessful,
    setLevel,
    setRound,
    setPattern,
    setRoundGuesses,
    setTokenPlacement,
    level,
    pattern,
    round,
    makeSuccessIndicatorVisible,
    setDiscoveredTokens,
  ]);

  useEffect(() => {
    return () => setPattern([]);
  }, []);

  useEffect(() => {
    if (!functions || previousLevel.current === level) return;
    functions.setFirstRound();
    functions.resetDiscoveredTokens();
    functions.newPattern();
    previousLevel.current = level;
  }, [functions, level]);

  useEffect(() => {
    if (!pattern.length || !functions) return;

    functions.resetRoundGuesses();
    functions.setTokenPlacement();
    previousPattern.current = pattern;
  }, [pattern, functions]);

  // Whenever the token is placed we should start the countdown and then clear it when this updates
  useEffect(() => {
    if (tokenPlacement < 0 || !functions) return;

    functions.startCounting();

    return () => {
      functions.stopCounting();
    };
  }, [tokenPlacement, functions]);

  useEffect(() => {
    // This is the array of JSX Elements we'll end up returning to render
    const boxes = [];

    for (let i = 0; i < 25; i++) {
      // If the index is part of out pattern array, then we need to render a box in that cell
      if (pattern.includes(i)) {
        boxes.push(<Box boxIndex={i} key={i} />);
      }
      // Otherwise, we just fill it with a filler box
      else {
        boxes.push(<FillerBox key={i} />);
      }
    }

    // Return the array of our JSX Elements
    setBoxes(boxes);
  }, [pattern]);

  return functions ? <div className="ts-board">{boxes}</div> : null;
};
