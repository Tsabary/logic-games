// Return either 0 or 1
export const returnZeroOrOne = () => {
  return Math.floor(Math.random() * 2);
};

// When we want to start counting we set these values. These all affect what happens in the action timer in the sidebar
export const startCounting = (setActionStartTime, setIsActionTimerRunning) => {
  // We set a new start time to check how long it takes the user to answer
  setActionStartTime(Date.now());

  // We set actionTimerRunning to true so it'll run the count interval inside the time counter.
  setIsActionTimerRunning(true);
};

// When we want to stop counting we set these values. These all affect what happens in the action timer in the sidebar
export const stopCounting = (
  setActionStartTime,
  setTimePerAction,
  setIsActionTimerRunning
) => {
  // We reset the start time to default, as this will be reset to the current date when this component is rendered again (and we'll that info)
  setActionStartTime(0);

  // We reset the time per action to 0 so when we reload this component or other components that use the timer, they wont start counting until they set the time per action
  setTimePerAction(0);

  // We set actionTimerRunning to false so it won't run the count interval inside the time counter.
  setIsActionTimerRunning(false);
};
