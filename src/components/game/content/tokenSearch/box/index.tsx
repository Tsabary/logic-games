import "./styles.scss";
import React, { useState, useEffect, useCallback } from "react";

interface BoxProps {
  boxIndex: number;
  pattern: number[];
  roundGuesses: number[];
  tokenPlacement: number;
  discoveredTokens: number[];
  level: number;
  newLevelUp: () => void;
  newLevelDown: () => void;
  resetRound: (token: number) => void;
  addToGuesses: (token: number) => void;
  startCounting: () => void;
  stopCounting: () => void;
}

export default (props: BoxProps) => {
  const [className, setClassName] = useState("box box--default");
  const [isClicked, setIsClicked] = useState(false);
  let to: NodeJS.Timeout | null = null;

  const setTO = (fn: () => void) => {
    clearTo(to);
    to = setTimeout(() => {
      fn();
    }, 500);
  };

  const clearTo = (to: NodeJS.Timeout | null) => {
    if (to) clearTimeout(to);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    /**
     * Our switch statement that helps us decide the render and response actions
     * case 1 - the user reopened an empty box they've checked before in this round
     *        - We need to show the error empty box indicator and then .5 second later reset a new level
     *
     * case 2 - the user reopened a box with a token that they've found before in this level
     *        - We need to show the error token box indicator and then .5 second later reset a new level
     *
     * case 3 - the user found the token and it is the last token to be found
     *        - We need to show the success token box indicator and .5 second later reset a new level
     *
     * case 4 - the user found the token and there are more tokens to be found
     *        - We need to show the success token box indicator, IMMEDIATLY reset their box guesses, add to their discovered tokens and .5 second later reset their box to the default
     *
     * case 5 - the user clicked an empty box for the first time
     *        - We need to show the empty box indicator, IMMEDIATLY add that guess to their box guesses and .5 second later reset their box to the default
     */

    switch (
      true //The order of cases is very important here
    ) {
      case props.roundGuesses.includes(props.boxIndex):
        setIsClicked(true);
        props.stopCounting()
        setTO(() => {
          setIsClicked(false);
          props.newLevelDown();
        });
        break;

      case props.discoveredTokens.includes(props.boxIndex):
        setIsClicked(true);
        props.stopCounting()

        setTO(() => {
          setIsClicked(false);
          props.newLevelDown();
        });
        break;

      case props.boxIndex === props.tokenPlacement &&
        props.discoveredTokens.length + 1 === props.level:
        setIsClicked(true);
        props.stopCounting()

        setTO(() => {
          setIsClicked(false);
          props.newLevelUp();
        });
        break;

      case props.boxIndex === props.tokenPlacement &&
        props.discoveredTokens.length + 1 !== props.level:
        setIsClicked(true);
        props.startCounting();
        props.resetRound(props.boxIndex);

        setTO(() => {
          setIsClicked(false);
        });
        break;

      case props.pattern.includes(props.boxIndex):
      default:
        setIsClicked(true);
        props.startCounting();
        props.addToGuesses(props.boxIndex);

        setTO(() => {
          setIsClicked(false);
        });
        break;
    }
  };

  const getClassName = useCallback(
    (
      boxIndex: number,
      roundGuesses: number[],
      discoveredTokens: number[],
      tokenPlacement: number,
      pattern: number[],
      level: number
    ) => {
      switch (
        true //The order of cases is very important here
      ) {
        case roundGuesses.includes(boxIndex):
          return "box--reopened";

        case discoveredTokens.includes(boxIndex):
          return "box--reopened-token";

        case boxIndex === tokenPlacement &&
          props.discoveredTokens.length + 1 === props.level:
          return "box--token";

        case boxIndex === tokenPlacement &&
          discoveredTokens.length + 1 !== level:
          return "box--token";

        case pattern.includes(boxIndex):
        default:
          return "box--empty";
      }
    },
    [props.discoveredTokens.length, props.level]
  );

  useEffect(() => {
    return () => {
      clearTo(to);
    };
  }, [to]);

  useEffect(() => {
    if (isClicked) return;

    const classTO = setTimeout(() => {
      setClassName(
        getClassName(
          props.boxIndex,
          props.roundGuesses,
          props.discoveredTokens,
          props.tokenPlacement,
          props.pattern,
          props.level
        )
      );

      return () => clearTo(classTO);
    }, 200);
  }, [
    isClicked,
    props.boxIndex,
    props.pattern,
    props.roundGuesses,
    props.tokenPlacement,
    props.discoveredTokens,
    props.level,
    getClassName,
  ]);

  return (
    <div className="box__container">
      <input
        className="box__checkbox"
        type="checkbox"
        checked={isClicked}
        id={`box__checkbox--${props.boxIndex}`}
        readOnly
      />
      <label
        className="box--default"
        onClick={handleClick}
        htmlFor={`box__checkbox--${props.boxIndex}`}
      />
      <div className={className} />
    </div>
  );
};
