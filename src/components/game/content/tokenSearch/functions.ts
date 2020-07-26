// When we want to start counting we set these values. These all affect what happens in the action timer in the sidebar
export const startCounting = (
  setActionStartTime: React.Dispatch<React.SetStateAction<number>>,
  setIsActionTimerRunning: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // We set a new start time to check how long it takes the user to answer
  setActionStartTime(Date.now());

  // We set actionTimerRunning to true so it'll run the count interval inside the time counter.
  setIsActionTimerRunning(true);
};

// When we want to stop counting we set these values. These all affect what happens in the action timer in the sidebar
export const stopCounting = (
  setActionStartTime: React.Dispatch<React.SetStateAction<number>>,
  setTimePerAction: React.Dispatch<React.SetStateAction<number | null>>,
  setIsActionTimerRunning: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // We reset the start time to default, as this will be reset to the current date when this component is rendered again (and we'll that info)
  setActionStartTime(0);

  // We reset the time per action to 0 so when we reload this component or other components that use the timer, they wont start counting until they set the time per action
  setTimePerAction(null);

  // We set actionTimerRunning to false so it won't run the count interval inside the time counter.
  setIsActionTimerRunning(false);
};

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

export const dropLevel = (
  setIsLevelSuccessful: React.Dispatch<React.SetStateAction<number>>,
  setLevel: React.Dispatch<React.SetStateAction<number>>
) => {
  console.log("thissssssssssssssssssss dropLevel");
  setIsLevelSuccessful(2);
  setLevel((level) => (level === 1 ? 1 : level - 1));
};

export const jumpLevel = (
  setIsLevelSuccessful: React.Dispatch<React.SetStateAction<number>>,
  setLevel: React.Dispatch<React.SetStateAction<number>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  level: number,
  score: number
) => {
  setIsLevelSuccessful(1);
  setLevel((lvl) => lvl + 1);
  if (level > score) setScore(level);
};
