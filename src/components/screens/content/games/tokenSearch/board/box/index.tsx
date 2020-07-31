import "./styles.scss";
import React, { useState, useEffect, useContext } from "react";
import { Functions } from "../../../../utils/interfaces";
import { handleBoxClick, getBoxIndicatorClassName } from "./utils/functions";
import { jumpLevel, dropLevel, nextRound } from "../../../utils/functions";
import { gameInfoContext } from "../../../../../../../providers/GameInfo";
import { tokenSearchContext } from "../../../../../../../providers/TokenSearch";

interface BoxProps {
  boxIndex: number;
}

export default ({ boxIndex }: BoxProps) => {
  const { setIsLevelSuccessful, level, setLevel, setRound } = useContext(
    gameInfoContext
  );
  const {
    roundGuesses,
    setRoundGuesses,
    discoveredTokens,
    setDiscoveredTokens,
    tokenPlacement,
    setTokenPlacement,
    pattern,
    round,
  } = useContext(tokenSearchContext);

  const [functions, setFunctions] = useState<Functions>();

  const [className, setClassName] = useState("");

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const jumpLevelFn = () => {
      jumpLevel(setIsLevelSuccessful, setLevel);
    };

    const dropLevelFn = () => {
      dropLevel(setIsLevelSuccessful, level, setLevel);
    };

    const nextRoundFn = () => {
      nextRound(setRound);
    };

    const addToGuessesFn = (guessedBoxIndex: number) => {
      setRoundGuesses((guesses: number[]) => [...guesses, guessedBoxIndex]);
    };

    const addDiscoveredTokenFn = (newDiscoveredToken: number) => {
      setDiscoveredTokens((discoveredTokens: number[]) => [
        ...discoveredTokens,
        newDiscoveredToken,
      ]);
    };

    const resetRoundGuessesFn = () => {
      setRoundGuesses([]);
    };

    const setTokenPlacementFn = () => {
      setTokenPlacement(pattern[round - 1]);
    };

    const getBoxIndicatorClassNameFn = (): string => {
      return getBoxIndicatorClassName(
        boxIndex,
        discoveredTokens,
        roundGuesses,
        tokenPlacement
      );
    };

    const setClickedFn = () => setIsClicked(true);
    const setNotClickedFn = () => setIsClicked(false);

    const setToFn = (fn?: () => void) => {
      const to = setTimeout(() => {
        setNotClickedFn();
        fn && fn();
        clearTimeout(to);
      }, 500);
    };

    const handleBoxClickFn = () => {
      setIsClicked(true);
      handleBoxClick(
        boxIndex,
        roundGuesses,
        discoveredTokens,
        tokenPlacement,
        level,
        setToFn,
        addToGuessesFn,
        addDiscoveredTokenFn,
        resetRoundGuessesFn,
        setTokenPlacementFn,
        nextRoundFn,
        dropLevelFn,
        jumpLevelFn,
        setClickedFn
      );
    };

    setFunctions({
      getBoxIndicatorClassName: getBoxIndicatorClassNameFn,
      handleBoxClick: handleBoxClickFn,
    });
  }, [
    boxIndex,
    level,
    setRoundGuesses,
    setDiscoveredTokens,
    setTokenPlacement,
    setIsLevelSuccessful,
    setLevel,
    setRound,
    discoveredTokens,
    roundGuesses,
    tokenPlacement,
    pattern,
    round,
  ]);

  useEffect(() => {
    if (!functions || isClicked) return;

    setClassName(functions.getBoxIndicatorClassName());
  }, [discoveredTokens, roundGuesses, tokenPlacement, isClicked, functions]);

  return functions ? (
    <div className="box__container">
      <input
        className="box__checkbox"
        type="checkbox"
        checked={isClicked}
        id={`box__checkbox--${boxIndex}`}
        readOnly
      />
      <label
        className="box--default"
        onClick={functions.handleBoxClick}
        htmlFor={`box__checkbox--${boxIndex}`}
      />
      <div className={className} />
    </div>
  ) : null;
};
