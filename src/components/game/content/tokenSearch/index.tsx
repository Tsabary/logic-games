import "./styles.scss";
import React, { useContext, useState, useEffect } from "react";
import { GameInfoContext } from "../../../../providers/GameInfo";

import Box from "./box";
import FillerBox from "./fillerBox";
import NewLevelIndicator from "./newLevelIndicator";
// import { startCounting, stopCounting } from "../utils";
import { playWrong } from "../../../../sounds/playFunctions";

export default () => {
  const {
    setLivesLeft,
    score,
    setScore,
    setTimePerAction,
    actionTimeLeft,
    setActionTimeLeft,
    timePerAction,
    setActionStartTime,
    setIsActionTimerRunning,
    isSoundOn,
  } = useContext(GameInfoContext);

  // This is our current level. This determines how many sets of image & distraction Q the user gets to see.
  const initialLevel = 4;
  const [level, setLevel] = useState(initialLevel);

  // This keeps track on whether the user's round was succesful or not, s we know what indicator to show them. 0 = first round, show nothing, 1 = succefful round, 2 = failed round
  const [isLevelSuccessful, setIsLevelSuccessful] = useState(0);

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
    resetLevel(initialLevel);
  }, []);

  useEffect(() => {
    if (isGameVisible && !isLevelIndicatorVisible) setTPA();
  }, [isGameVisible, isLevelIndicatorVisible]);

  // This should only execute once on load and once on unload. When we
  useEffect(() => {
    if (!timePerAction) return;
    startCounting();

    return () => {
      stopCounting();
    };
  }, [timePerAction]);

  const setTPA = () => {
    const tpa = 3;
    setTimePerAction(tpa);
    setActionTimeLeft(tpa);
  };

  // When we want to start counting we set these values. These all affect what happens in the action timer in the sidebar
  const startCounting = () => {
    // We set a new start time to check how long it takes the user to answer
    setActionStartTime(Date.now());

    // We set actionTimerRunning to true so it'll run the count interval inside the time counter.
    setIsActionTimerRunning(true);
  };

  // When we want to stop counting we set these values. These all affect what happens in the action timer in the sidebar
  const stopCounting = () => {
    // We reset the start time to default, as this will be reset to the current date when this component is rendered again (and we'll that info)
    setActionStartTime(0);

    // We reset the time per action to 0 so when we reload this component or other components that use the timer, they wont start counting until they set the time per action
    setTimePerAction(0);

    // We set actionTimerRunning to false so it won't run the count interval inside the time counter.
    setIsActionTimerRunning(false);
  };

  // If the user took longer than 5 seconds to answer the distraction question, then it qualifies as a fail (wrong answer). We then call the stop counting method and call the handleOvertimr method we got from the parent component, so it'll handle this fail on it's side.
  useEffect(() => {
    if (actionTimeLeft < 0) {
      stopCounting();
      // dropLevel();
      // resetLevel(level - 1);
      if (isSoundOn) playWrong.play();
    }
  }, [actionTimeLeft]);

  useEffect(() => {
    if (discoveredTokens.length === level) {
      jumpLevel();
      resetLevel(level + 1);
    }
  }, [discoveredTokens, level]);

  const makeLevelIndicatorVisible = () => {
    setIsLevelIndicatorVisible(true);
    setIsGameVisible(false);
  };

  const makeGameVisible = () => {
    setIsLevelIndicatorVisible(false);
    setIsGameVisible(true);
  };

  const setNewPattern = (level: number) => {
    // Create an array of all numbers from 0 to 24
    const numbers = Array.from(Array(25).keys()).map((_, index) => index);

    // Randomaly re-arrange the numbers
    numbers.sort(() => Math.random() - 0.5);

    // Slice the array to have as many items as our level, which leads to us having a random set of box indexes. As many as our level
    const newPattern = numbers.slice(0, level);

    console.log("important info - new pattern is", newPattern);

    // Set this new array as our pattern
    setPattern(newPattern);

    // Reset/create a new round
    resetRound(newPattern, []);
  };

  const resetLevel = (level: number) => {
    // Reset the values left from our last level
    setDiscoveredTokens([]);
    setTokenPlacement(null);

    // Make the level indicator visible
    makeLevelIndicatorVisible();

    setTimeout(() => {
      // Create a new pattern for the level
      setNewPattern(level);

      // Make the game visible
      makeGameVisible();
    }, 3000);
  };

  const resetRound = (pattern: number[], discoveredTokens: number[]) => {
    // Reset the values left from our last round
    setRoundGuesses([]);
    setTokenPlacement(pattern[discoveredTokens.length]);
    console.log(
      "important info - the new token is",
      pattern[discoveredTokens.length]
    );
  };

  const dropLevel = () => {
    setIsLevelSuccessful(2);
    setLevel((level) => (level === 1 ? 1 : level - 1));
    setLivesLeft((lvs: number) => lvs - 1);
  };

  const jumpLevel = () => {
    setIsLevelSuccessful(1);
    setLevel((lvl) => lvl + 1);
    if (level > score) setScore(level);
  };

  const renderBoxes = (
    pattern: number[],
    tokenPlacement: number | null
  ): JSX.Element[] | undefined => {
    // We only want to show the boxes if the pattern has been set and the token has been placed
    if (!pattern.length || tokenPlacement == null) return;

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
              dropLevel();
              resetLevel(level - 1);
            }}
            newLevelUp={() => {
              jumpLevel();
              resetLevel(level + 1);
            }}
            resetRound={(boxIndex) => {
              const newDiscoveredTokens = [...discoveredTokens, boxIndex];
              setDiscoveredTokens(newDiscoveredTokens);
              resetRound(pattern, newDiscoveredTokens);
            }}
            addToGuesses={(boxIndex) => {
              setRoundGuesses((guesses) => [...guesses, boxIndex]);
            }}
            startCounting={startCounting}
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
