export const newPattern = (
  level: number,
  setPattern: React.Dispatch<React.SetStateAction<number[]>>
) => {
  // Create an array of all numbers from 0 to 24
  const numbers = Array.from(Array(25).keys()).map((_, index) => index);

  // Randomaly re-arrange the numbers
  numbers.sort(() => Math.random() - 0.5);

  // Slice the array to have as many items as our level, which leads to us having a random set of box indexes. As many as our level
  const newPattern = numbers.slice(0, level);

  // Set this new array as our pattern
  setPattern(newPattern);
};

export const getBoxIndicatorClassName = (
  boxIndex: number,
  discoveredTokens: number[],
  roundGuesses: number[],
  tokenPlacement: number | null
): string => {
  switch (
    true //The order of cases is very important here
  ) {
    case roundGuesses.includes(boxIndex):
      return "box--reopened";

    case discoveredTokens.includes(boxIndex):
      return "box--reopened-token";

    case boxIndex === tokenPlacement:
      return "box--token";

    default:
      return "box--empty";
  }
};

export const handleBoxClick = (
  boxIndex: number,
  roundGuesses: number[],
  discoveredTokens: number[],
  tokenPlacement: number,
  level: number,
  setTO: (...props: any[]) => void,
  addToGuesses: (boxIndex: number) => void,
  addToDiscoveredTokens: (boxIndex: number) => void,
  resetRoundGuesses: () => void,
  setTokenPlacement: () => void,
  nextRound: () => void,
  stopCounting: () => void,
  startCounting: () => void,
  dropLevel: () => void,
  jumpLevel: () => void,
  makeSuccessIndicatorVisible: () => void
) => {
  let setBoxClickResponseTimeout = (fn: () => void) => {
    const boxClickTimeout = setTimeout(() => {
      fn();
      clearTimeout(boxClickTimeout);
    }, 600);
  };

  switch (
    true //The order of cases is very important here
  ) {
    /**
     * Case 1
     * - the user reopened an empty box they've checked before in this round
     * - We need to show the error empty box indicator and then .5 second later reset a new level
     */
    case roundGuesses.includes(boxIndex):
      stopCounting();
      setTO();
      setBoxClickResponseTimeout(() => {
        dropLevel();
        // makeSuccessIndicatorVisible();
      });
      break;

    /**
     * Case 2
     * - the user reopened a box with a token that they've found before in this level
     * - We need to show the error token box indicator and then .5 second later reset a new level
     */
    case discoveredTokens.includes(boxIndex):
      stopCounting();
      setTO();
      setBoxClickResponseTimeout(() => {
        dropLevel();
        // makeSuccessIndicatorVisible();
      });
      break;

    /**
     * Case 3
     * - the user found the token and it is the last token to be found
     * - We need to show the success token box indicator and .5 second later reset a new level
     */
    case boxIndex === tokenPlacement && discoveredTokens.length + 1 === level:
      stopCounting();
      setTO();
      setBoxClickResponseTimeout(() => {
        jumpLevel();
        // makeSuccessIndicatorVisible();
      });
      break;

    /**
     * Case 4
     * - the user found the token and there are more tokens to be found
     * - We need to show the success token box indicator, IMMEDIATLY reset their box guesses, add to their discovered tokens and initiate a new round (with a new hidden token)
     */
    case boxIndex === tokenPlacement && discoveredTokens.length + 1 !== level:
      startCounting();
      setTO(() => {});
      setBoxClickResponseTimeout(() => {
        addToDiscoveredTokens(boxIndex);
        resetRoundGuesses();
        setTokenPlacement();
        nextRound();
      });
      break;

    /**
     * Case 5
     * - the user clicked an empty box for the first time
     * - We need to show the empty box indicator, IMMEDIATLY add that guess to their box guesses and .5 second later reset their box to the default
     */
    default:
      startCounting();
      setTO();
      setBoxClickResponseTimeout(() => {
        addToGuesses(boxIndex);
      });
      break;
  }
};

// export const newRound = (
//   pattern: number[],
//   discoveredTokens: number[],
//   setDiscoveredTokens: React.Dispatch<React.SetStateAction<number[]>>,
//   setRoundGuesses: React.Dispatch<React.SetStateAction<number[]>>,
//   setTokenPlacement: React.Dispatch<React.SetStateAction<number | null>>,
//   discoveredBoxIndex: number
// ) => {
//   setDiscoveredTokens((discoveredTokens) => [
//     ...discoveredTokens,
//     discoveredBoxIndex,
//   ]);

//   // Reset the round gueses from our last round
//   setRoundGuesses([]);

//   // Place the token somewhere new. Because of they way we've generated the pattern which created a randomized list of all the boxes that ar part of the pattern, simply moving to the next element would give us a good unpredictable next place for our token
//   setTokenPlacement(pattern[discoveredTokens.length]);
// };