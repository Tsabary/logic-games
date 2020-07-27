export const makeLevelIndicatorVisible = (
  setIsLevelIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLevelIndicatorVisible(true);
  setIsGameVisible(false);
};

export const makeGameVisible = (
  setIsLevelIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLevelIndicatorVisible(false);
  setIsGameVisible(true);
};

export const setNewPattern = (
  level: number,
  setPattern: React.Dispatch<React.SetStateAction<number[]>>,
  setRoundGuesses: React.Dispatch<React.SetStateAction<number[]>>,
  setTokenPlacement: React.Dispatch<React.SetStateAction<number | null>>
) => {
  // Create an array of all numbers from 0 to 24
  const numbers = Array.from(Array(25).keys()).map((_, index) => index);

  // Randomaly re-arrange the numbers
  numbers.sort(() => Math.random() - 0.5);

  // Slice the array to have as many items as our level, which leads to us having a random set of box indexes. As many as our level
  const newPattern = numbers.slice(0, level);

  // Set this new array as our pattern
  setPattern(newPattern);

  // Reset/create a new round
  resetRound(newPattern, [], setRoundGuesses, setTokenPlacement);
};

export const resetLevel = (
  level: number,
  setDiscoveredTokens: React.Dispatch<React.SetStateAction<number[]>>,
  setTokenPlacement: React.Dispatch<React.SetStateAction<number | null>>,
  makeLevelIndicatorVisible: () => void,
  makeGameVisible: () => void,
  setPattern: React.Dispatch<React.SetStateAction<number[]>>,
  setRoundGuesses: React.Dispatch<React.SetStateAction<number[]>>
) => {

  // Reset the values left from our last level
  setDiscoveredTokens([]);
  setTokenPlacement(null);

  // Make the level indicator visible
  makeLevelIndicatorVisible();

  setTimeout(() => {
    // Create a new pattern for the level
    setNewPattern(level, setPattern, setRoundGuesses, setTokenPlacement);

    // Make the game visible
    makeGameVisible();
  }, 3000);
};

export const resetRound = (
  pattern: number[],
  discoveredTokens: number[],
  setRoundGuesses: React.Dispatch<React.SetStateAction<number[]>>,
  setTokenPlacement: React.Dispatch<React.SetStateAction<number | null>>
) => {
  // Reset the values left from our last round
  setRoundGuesses([]);
  setTokenPlacement(pattern[discoveredTokens.length]);
};
