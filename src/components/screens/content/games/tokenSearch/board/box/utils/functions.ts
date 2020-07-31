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
  dropLevel: () => void,
  jumpLevel: () => void,
  setClicked: () => void
) => {
  setClicked();

  switch (
    true //The order of cases is very important here
  ) {
    /**
     * Case 1
     * - the user reopened an empty box they've checked before in this round
     * - We need to show the error empty box indicator and then .5 second later reset a new level
     */
    case roundGuesses.includes(boxIndex):
      setTO(dropLevel);
      break;

    /**
     * Case 2
     * - the user reopened a box with a token that they've found before in this level
     * - We need to show the error token box indicator and then .5 second later reset a new level
     */
    case discoveredTokens.includes(boxIndex):
      setTO(dropLevel);
      break;

    /**
     * Case 3
     * - the user found the token and it is the last token to be found
     * - We need to show the success token box indicator and .5 second later reset a new level
     */
    case boxIndex === tokenPlacement && discoveredTokens.length + 1 === level:
      setTO(jumpLevel);
      break;

    /**
     * Case 4
     * - the user found the token and there are more tokens to be found
     * - We need to show the success token box indicator, IMMEDIATLY reset their box guesses, add to their discovered tokens and initiate a new round (with a new hidden token)
     */
    case boxIndex === tokenPlacement && discoveredTokens.length + 1 !== level:
      addToDiscoveredTokens(boxIndex);
      resetRoundGuesses();
      setTokenPlacement();
      nextRound();
      setTO(() => {});
      break;

    /**
     * Case 5
     * - the user clicked an empty box for the first time
     * - We need to show the empty box indicator, IMMEDIATLY add that guess to their box guesses and .5 second later reset their box to the default
     */
    default:
      addToGuesses(boxIndex);
      setTO();
      break;
  }
};
