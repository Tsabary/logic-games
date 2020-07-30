import { ZeroOne } from "../../../../utils/interfaces";
import { playWrong, playCorrect } from "../../../../../sounds/playFunctions";

// Return either 0 or 1
export const returnZeroOrOne = (): ZeroOne => {
  return Math.random() > 0.5 ? 1 : 0;
};

export const playSuccessIndicationSound = (
  isCorrect: boolean,
  isSoundOn: boolean
) => {
  if (!isSoundOn) return;

  isCorrect ? playCorrect.play() : playWrong.play();
};

// ACTION COUNTER - When we want to start counting we set these values. These all affect what happens in the action timer in the sidebar
export const startCounting = (
  setActionStartTime: React.Dispatch<React.SetStateAction<number>>,
  setTimePerAction: React.Dispatch<React.SetStateAction<number | undefined>>,
  setIsActionTimerRunning: React.Dispatch<React.SetStateAction<boolean>>,
  timerPerAction: number
) => {
  // We set a new start time to check how long it takes the user to answer
  setActionStartTime(Date.now());

  // We reset the time per action to 0 so when we reload this component or other components that use the timer, they wont start counting until they set the time per action
  setTimePerAction(timerPerAction);

  // We set actionTimerRunning to true so it'll run the count interval inside the time counter.
  setIsActionTimerRunning(true);
};

// ACTION COUNTER - When we want to stop counting we set these values. These all affect what happens in the action timer in the sidebar
export const stopCounting = (
  setActionStartTime: React.Dispatch<React.SetStateAction<number>>,
  setTimePerAction: React.Dispatch<React.SetStateAction<number | undefined>>,
  setIsActionTimerRunning: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // We reset the start time to default, as this will be reset to the current date when this component is rendered again (and we'll that info)
  setActionStartTime(0);

  // We reset the time per action to 0 so when we reload this component or other components that use the timer, they wont start counting until they set the time per action
  setTimePerAction(undefined);

  // We set actionTimerRunning to false so it won't run the count interval inside the time counter.
  setIsActionTimerRunning(false);
};

// GAME COUNTER - When we want to start counting we set these values. These all affect what happens in the action timer in the sidebar
export const startCountdown = (
  setGameStartTime: React.Dispatch<React.SetStateAction<number>>,
  setIsGameTimerRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setTimePerGame: React.Dispatch<React.SetStateAction<number>>,
  timePerGame: number
) => {
  // We set a new start time to check how long it takes the user to answer
  setGameStartTime(Date.now());

  // We set actionTimerRunning to true so it'll run the count interval inside the time counter.
  setIsGameTimerRunning(true);

  // We set timePerGame to whatever value we pass to it by the game
  setTimePerGame(timePerGame);
};

export const dropLevel = (
  setIsLevelSuccessful: React.Dispatch<React.SetStateAction<boolean>>,
  setLevel: React.Dispatch<React.SetStateAction<number>>
) => {
  setIsLevelSuccessful(false);
  setLevel((level) => (level === 1 ? 1 : level - 1));
};

export const jumpLevel = (
  setIsLevelSuccessful: React.Dispatch<React.SetStateAction<boolean>>,
  setLevel: React.Dispatch<React.SetStateAction<number>>
) => {
  setIsLevelSuccessful(true);
  setLevel((level) => level + 1);
};

export const nextRound = (
  setRound: React.Dispatch<React.SetStateAction<number>>
) => {
  setRound((round) => round + 1);
};

export const setFirstRound = (
  setRound: React.Dispatch<React.SetStateAction<number>>
) => {
  setRound(1);
};
