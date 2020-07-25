import "./styles.scss";
import React, { useState, useEffect } from "react";

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
}

export default (props: BoxProps) => {
  const [className, setClassName] = useState("box box--default");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) return;

    setTimeout(() => {
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
    }, 200);
  }, [
    isClicked,
    props.pattern,
    props.roundGuesses,
    props.tokenPlacement,
    props.discoveredTokens,
  ]);

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
        // setClassName("box box--reopened");
        setIsClicked(true);
        setTimeout(() => {
          setIsClicked(false);
          props.newLevelDown();
        }, 500);
        break;

      case props.discoveredTokens.includes(props.boxIndex):
        setIsClicked(true);

        setTimeout(() => {
          setIsClicked(false);
          props.newLevelDown();
        }, 500);
        break;

      case props.boxIndex === props.tokenPlacement &&
        props.discoveredTokens.length + 1 === props.level:
        setIsClicked(true);

        setTimeout(() => {
          setIsClicked(false);
          props.newLevelUp();
        }, 500);
        break;

      case props.boxIndex === props.tokenPlacement &&
        props.discoveredTokens.length + 1 !== props.level:
        setIsClicked(true);
        props.startCounting();

        props.resetRound(props.boxIndex);
        setTimeout(() => {
          setIsClicked(false);
        }, 500);
        break;

      case props.pattern.includes(props.boxIndex):
      default:
        setIsClicked(true);
        props.startCounting();

        props.addToGuesses(props.boxIndex);
        setTimeout(() => {
          setIsClicked(false);
        }, 500);
        break;
    }
  };

  const getClassName = (
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

      case boxIndex === tokenPlacement && discoveredTokens.length + 1 !== level:
        return "box--token";

      case pattern.includes(boxIndex):
      default:
        return "box--empty";
    }
  };

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
