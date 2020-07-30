import "./styles.scss";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { gameInfoContext } from "../../../../../../../providers/GameInfo";

interface BoxProps {
  boxIndex: number;
  roundGuesses: number[];
  tokenPlacement: number;
  discoveredTokens: number[];
  newLevelUp: () => void;
  newLevelDown: () => void;
  resetRound: (token: number) => void;
  addToGuesses: (token: number) => void;
  startCounting: () => void;
  stopCounting: () => void;
}




export default ({
  boxIndex,
  roundGuesses,
  tokenPlacement,
  discoveredTokens,
  newLevelUp,
  newLevelDown,
  resetRound,
  addToGuesses,
  startCounting,
  stopCounting,
}: BoxProps) => {
  const { level } = useContext(gameInfoContext);

  const [className, setClassName] = useState("box box--default");
  const [isClicked, setIsClicked] = useState(false);
  let to: NodeJS.Timeout | null = null;

  const setTO = (fn: () => void) => {
    clearTo(to);
    to = setTimeout(() => {
      setIsClicked(false);
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
     *        - We need to show the success token box indicator, IMMEDIATLY reset their box guesses, add to their discovered tokens and initiate a new round (with a new hidden token)
     *
     * case 5 - the user clicked an empty box for the first time
     *        - We need to show the empty box indicator, IMMEDIATLY add that guess to their box guesses and .5 second later reset their box to the default
     */

    switch (
      true //The order of cases is very important here
    ) {
      // Case 1
      case roundGuesses.includes(boxIndex):
        setIsClicked(true);
        stopCounting();
        setTO(() => {
          newLevelDown();
        });
        break;

      // Case 2
      case discoveredTokens.includes(boxIndex):
        setIsClicked(true);
        stopCounting();

        setTO(() => {
          newLevelDown();
        });
        break;

      // Case 3
      case boxIndex === tokenPlacement && discoveredTokens.length + 1 === level:
        setIsClicked(true);
        stopCounting();

        setTO(() => {
          newLevelUp();
        });
        break;

      // Case 4
      case boxIndex === tokenPlacement && discoveredTokens.length + 1 !== level:
        setIsClicked(true);
        startCounting();
        resetRound(boxIndex);

        setTO(() => {});
        break;

      // Case 5
      default:
        setIsClicked(true);
        startCounting();
        addToGuesses(boxIndex);

        setTO(() => {});
        break;
    }
  };

  const getClassName = useMemo(
    () => (
      boxIndex: number,
      roundGuesses: number[],
      discoveredTokens: number[],
      tokenPlacement: number,
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
          discoveredTokens.length + 1 === level:
          return "box--token";

        case boxIndex === tokenPlacement &&
          discoveredTokens.length + 1 !== level:
          return "box--token";

        default:
          return "box--empty";
      }
    },
    [boxIndex, roundGuesses, discoveredTokens, tokenPlacement]
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
          boxIndex,
          roundGuesses,
          discoveredTokens,
          tokenPlacement,
          level
        )
      );

      return () => clearTo(classTO);
    }, 200);
  }, [
    isClicked,
    boxIndex,
    roundGuesses,
    tokenPlacement,
    discoveredTokens,
    getClassName,
    level,
  ]);

  return (
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
        onClick={handleClick}
        htmlFor={`box__checkbox--${boxIndex}`}
      />
      <div className={className} />
    </div>
  );
};
