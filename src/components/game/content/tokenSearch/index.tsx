import "./styles.scss";
import React, { useContext, useState, useEffect } from "react";
import { GameInfoContext } from "../../../../providers/GameInfo";

import Box from "./box";
import FillerBox from "./fillerBox";
import NewLevelIndicator from "./newLevelIndicator";
import { playWrong } from "../../../../sounds/playFunctions";

// These are functions that are unique to this game
import {
  resetLevel,
  makeLevelIndicatorVisible,
  makeGameVisible,
  resetRound,
} from "./functions";

// These are functions that are shared between different games
import {
  startCounting,
  stopCounting,
  dropLevel,
  jumpLevel,
} from "../utils/functions";

export default () => {
  const {
    fails,
    setFails,
    score,
    setScore,
    setTimePerAction,
    timePerAction,
    setActionStartTime,
    setIsActionTimerRunning,
    isSoundOn,
    isDone,
  } = useContext(GameInfoContext);

  // This is our current level. This determines how many sets of image & distraction Q the user gets to see.
  const initialLevel = 4;
  const [level, setLevel] = useState(initialLevel);

  // This keeps track on whether the user's round was succesful or not, s we know what indicator to show them. 0 = first round, show nothing, 1 = succefful round, 2 = failed round
  const [isLevelSuccessful, setIsLevelSuccessful] = useState<number>(0);

  // This is the pattern of boxes that the user will have on screen to click for the level. It only changes when the level changes.
  const [pattern, setPattern] = useState<number[]>([]);

  // These are the indexes of all the boxes in which the user have found a token for this level. This resets when the level changes.
  const [discoveredTokens, setDiscoveredTokens] = useState<number[]>([]);

  // This is where the token is hidden. This changes every new round
  const [tokenPlacement, setTokenPlacement] = useState<number | null>(null);

  // These are the indexes of all the boxes the user clicked in the round. This resets when the user finds the token and a new ound starts, or when the user clicks a box that they've previousy clicked and a new round starts
  const [roundGuesses, setRoundGuesses] = useState<number[]>([]);

  // When there's a level change, either when we pass or fail, we need to indicate that to the user. This state controls whether that compnent is visible or not
  const [isLevelIndicatorVisible, setIsLevelIndicatorVisible] = useState(false);

  // Should the game be visible now? THis helps us toggle the game and the level indicator
  const [isGameVisible, setIsGameVisible] = useState(false);

  useEffect(() => {
    if (discoveredTokens.length === level) {
      jumpLevel(setIsLevelSuccessful, setLevel, setScore, level, score);
      resetLevel(
        level + 1,
        setDiscoveredTokens,
        setTokenPlacement,
        () =>
          makeLevelIndicatorVisible(
            setIsLevelIndicatorVisible,
            setIsGameVisible
          ),
        () => makeGameVisible(setIsLevelIndicatorVisible, setIsGameVisible),
        setPattern,
        setRoundGuesses
      );
    }
  }, [discoveredTokens, level, score, setScore]);

  useEffect(() => {
    resetLevel(
      initialLevel,
      setDiscoveredTokens,
      setTokenPlacement,
      () =>
        makeLevelIndicatorVisible(setIsLevelIndicatorVisible, setIsGameVisible),
      () => makeGameVisible(setIsLevelIndicatorVisible, setIsGameVisible),
      setPattern,
      setRoundGuesses
    );
  }, []);

  useEffect(() => {
    if (isGameVisible && !isLevelIndicatorVisible && !isDone) {
      setTimePerAction(5);
    } else {
      setTimePerAction(null);
    }
  }, [isGameVisible, isLevelIndicatorVisible, isDone, setTimePerAction]);

  // This should only execute once on load and once on unload. When we
  useEffect(() => {
    if (!timePerAction) return;
    startCounting(setActionStartTime, setIsActionTimerRunning);

    return () => {
      stopCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning
      );
    };
  }, [
    timePerAction,
    setActionStartTime,
    setTimePerAction,
    setIsActionTimerRunning,
  ]);

  // If there was a change in our fails, we might ne
  useEffect(() => {
    if (!fails) return;

    // If the fail changed, in this game it means that we have dropped a level, so stop the counter. It will resume when the game resumes
    stopCounting(setActionStartTime, setTimePerAction, setIsActionTimerRunning);

    // If the fail changed, in this game it means that we have dropped a level. Se the success indicator to fail and drop a level in the level state
    dropLevel(setIsLevelSuccessful, setLevel);

    // If the fail changed, in this game it means that we have dropped a level. Time for a reset
    resetLevel(
      level - 1,
      setDiscoveredTokens,
      setTokenPlacement,
      () =>
        makeLevelIndicatorVisible(setIsLevelIndicatorVisible, setIsGameVisible),
      () => makeGameVisible(setIsLevelIndicatorVisible, setIsGameVisible),
      setPattern,
      setRoundGuesses
    );

    // If the sound is on buzz the user
    if (isSoundOn) playWrong.play();
  }, [
    fails,
    isSoundOn,
    setActionStartTime,
    setIsActionTimerRunning,
    setTimePerAction,
  ]);

  const renderBoxes = (
    pattern: number[],
    tokenPlacement: number | null
  ): JSX.Element[] | undefined => {
    // We only want to show the boxes if the pattern has been set and the token has been placed
    if (!pattern.length || tokenPlacement == null) {
      return;
    }

    // This is the array of JSX Elements we'll end up returning to render
    const boxes = [];

    for (let i = 0; i < 25; i++) {
      // If the index is part of out pattern array, then we need to render a box in that cell
      if (pattern.includes(i)) {
        boxes.push(
          <Box
            key={i}
            boxIndex={i}
            pattern={pattern}
            roundGuesses={roundGuesses}
            discoveredTokens={discoveredTokens}
            tokenPlacement={tokenPlacement}
            level={level}
            newLevelDown={() => {
              setFails((fails: number) => fails + 1);
            }}
            newLevelUp={() => {
              jumpLevel(setIsLevelSuccessful, setLevel, setScore, level, score);
              resetLevel(
                level + 1,
                setDiscoveredTokens,
                setTokenPlacement,
                () =>
                  makeLevelIndicatorVisible(
                    setIsLevelIndicatorVisible,
                    setIsGameVisible
                  ),
                () =>
                  makeGameVisible(setIsLevelIndicatorVisible, setIsGameVisible),
                setPattern,
                setRoundGuesses
              );
            }}
            resetRound={(boxIndex) => {
              const newDiscoveredTokens = [...discoveredTokens, boxIndex];
              setDiscoveredTokens(newDiscoveredTokens);
              resetRound(
                pattern,
                newDiscoveredTokens,
                setRoundGuesses,
                setTokenPlacement
              );
            }}
            addToGuesses={(boxIndex) => {
              setRoundGuesses((guesses) => [...guesses, boxIndex]);
            }}
            startCounting={() => {
              startCounting(setActionStartTime, setIsActionTimerRunning);
            }}
            stopCounting={() =>
              stopCounting(
                setActionStartTime,
                setTimePerAction,
                setIsActionTimerRunning
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
    return boxes;
  };

  const renderContent = (
    isGameVisible: boolean,
    isLevelIndicatorVisible: boolean,
    level: number
  ) => {
    switch (true) {
      case isGameVisible && !isLevelIndicatorVisible:
        return (
          <div className="token-search__container">
            {renderBoxes(pattern, tokenPlacement)}
          </div>
        );

      case isLevelIndicatorVisible && !isGameVisible:
        return (
          <NewLevelIndicator level={level} isSuccessful={isLevelSuccessful} />
        );
    }
  };

  return (
    <div className="token-search">
      {renderContent(isGameVisible, isLevelIndicatorVisible, level)}
    </div>
  );
};

/**
 * LEVEL HAS:
 * - One order to the boxes.
 * - All tokens must be found (as many tokens as box - the same as the current level).
 * - If we find all tokens, our score increaes to the level we've just completes (unless we already havea higher score).
 * - If we make a mistake of clicking a box twice, no matter if it had a token in it or not, we lose a life and drop a level.
 */

/**
 * ROUND HAS:
 * - One token hidden
 * - Each box could be clicked maximum once
 * - If the token is found, or if we click the same box twice, the ound is over and we either go up a level or drop a level
 */
