import React, { useState, useEffect, useContext, useRef } from "react";
import "./styles.scss";

import Box from "./box";
import FillerBox from "./fillerBox";

// These are functions that are shared between different games
import {
  startCounting,
  stopCounting,
  dropLevel,
  jumpLevel,
  nextRound,
  setFirstRound,
} from "../../utils/functions";
import { gameInfoContext } from "../../../../../../providers/GameInfo";
import {
  newPattern,
  getBoxIndicatorClassName,
  handleBoxClick,
} from "./utils/functions";
import { Functions } from "../../../utils/interfaces";

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

  const [functions, setFunctions] = useState<Functions>();

  const [boxes, setBoxes] = useState<JSX.Element[]>();

  // This is the pattern of boxes that the user will have on screen to click for the level. It only changes when the level changes.
  const [pattern, setPattern] = useState<number[]>([]);

  // These are the indexes of all the boxes in which the user have found a token for this level. This resets when the level changes.
  const [discoveredTokens, setDiscoveredTokens] = useState<number[]>([]);

  // This is where the token is hidden. This changes every new round
  const [tokenPlacement, setTokenPlacement] = useState<number>(-1);

  // These are the indexes of all the boxes the user clicked in the round. This resets when the user finds the token and a new ound starts, or when the user clicks a box that they've previousy clicked and a new round starts
  const [roundGuesses, setRoundGuesses] = useState<number[]>([]);

  const previousLevel = useRef();

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

    const jumpLevelFn = () => {
      jumpLevel(setIsLevelSuccessful, setLevel);
    };

    const dropLevelFn = () => {
      dropLevel(setIsLevelSuccessful, level, setLevel);
    };

    const nextRoundFn = () => {
      nextRound(setRound);
    };

    const setFirstRoundFn = () => {
      setFirstRound(setRound);
    };

    const addToGuessesFn = (guessedBoxIndex: number) => {
      setRoundGuesses((guesses) => [...guesses, guessedBoxIndex]);
    };

    const newPatternFn = () => {
      newPattern(level, setPattern);
    };

    const addDiscoveredTokenFn = (newDiscoveredToken: number) => {
      setDiscoveredTokens((discoveredTokens) => [
        ...discoveredTokens,
        newDiscoveredToken,
      ]);
    };

    const resetRoundGuessesFn = () => {
      setRoundGuesses([]);
    };

    // Place the token somewhere new. Because of they way we've generated the pattern which created a randomized list of all the boxes that ar part of the pattern, simply moving to the next element would give us a good unpredictable next place for our token
    const setTokenPlacementFn = () => {
      setTokenPlacement(pattern[round - 1]);
    };

    const getBoxIndicatorClassNameFn = (
      boxIndex: number,
      discoveredTokens: number[],
      roundGuesses: number[],
      tokenPlacement: number
    ): string => {
      return getBoxIndicatorClassName(
        boxIndex,
        discoveredTokens,
        roundGuesses,
        tokenPlacement
      );
    };

    const handleBoxClickFn = (
      boxIndex: number,
      roundGuesses: number[],
      discoveredTokens: number[],
      tokenPlacement: number,
      level: number,
      setTO: () => void
    ) => {
      handleBoxClick(
        boxIndex,
        roundGuesses,
        discoveredTokens,
        tokenPlacement,
        level,
        setTO,
        addToGuessesFn,
        addDiscoveredTokenFn,
        resetRoundGuessesFn,
        setTokenPlacementFn,
        nextRoundFn,
        stopCountingFn,
        startCountingFn,
        dropLevelFn,
        jumpLevelFn,
        makeSuccessIndicatorVisible
      );
    };

    setFunctions({
      startCounting: startCountingFn,
      stopCounting: stopCountingFn,
      jumpLevel: jumpLevelFn,
      dropLevel: dropLevelFn,
      nextRound: nextRoundFn,
      setFirstRound: setFirstRoundFn,
      addToGuesses: addToGuessesFn,
      newPattern: newPatternFn,
      addDiscoveredToken: addDiscoveredTokenFn,
      resetRoundGuesses: resetRoundGuessesFn,
      setTokenPlacement: setTokenPlacementFn,
      getBoxIndicatorClassName: getBoxIndicatorClassNameFn,
      handleBoxClick: handleBoxClickFn,
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
    setDiscoveredTokens,
    level,
    pattern,
    round,
    makeSuccessIndicatorVisible,
  ]);

  useEffect(() => {
    if (!functions || previousLevel.current === level) return;
    functions.setFirstRound();
    functions.newPattern();
    previousLevel.current = level;
  }, [functions, level]);

  useEffect(() => {
    if (!pattern.length || !functions) return;
    functions.resetRoundGuesses();
    functions.setTokenPlacement();
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
    // We only want to show the boxes if the pattern has been set and the token has been placed (token is only set after pattern)
    if (tokenPlacement < 0 || !functions) return;

    // This is the array of JSX Elements we'll end up returning to render
    const boxes = [];

    for (let i = 0; i < 25; i++) {
      // If the index is part of out pattern array, then we need to render a box in that cell
      if (pattern.includes(i)) {
        boxes.push(
          <Box
            key={i}
            boxIndex={i}
            indicatorClassname={functions!.getBoxIndicatorClassName(
              i,
              discoveredTokens,
              roundGuesses,
              tokenPlacement
            )}
            handleBoxClick={(setTO) =>
              functions.handleBoxClick(
                i,
                roundGuesses,
                discoveredTokens,
                tokenPlacement,
                level,
                setTO
              )
            }
          />
        );
      }
      // Otherwise, we just fill it with a filler box
      else {
        boxes.push(<FillerBox key={i} />);
      }
    }

    // Return the array of our JSX Elements
    setBoxes(boxes);
  }, [
    tokenPlacement,
    discoveredTokens,
    roundGuesses,
    pattern,
    level,
    setTimePerAction,
    functions,
  ]);

  return functions ? <div className="ts-board">{boxes}</div> : null;
};
