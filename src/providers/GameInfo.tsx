import React, { useState, useEffect, ReactNode, useRef } from "react";
import { ContextValues } from "../components/utils/interfaces";

type Props = {
  children: ReactNode;
};

export const gameInfoContext = React.createContext<ContextValues>({});

export const GameInfoProvider = ({ children }: Props) => {
  /**
   * 0 - Double Trouble
   * 1 - Grammatical Reasoning
   * 2 - Corsi Block
   * 3 - Operation Span
   * 4 - Token Search
   */

  //  GLOBAL //
  const [isFirstRun, setIsFirstRun] = useState(true);

  const [challenge, setChallenge] = useState<number>(4);

  // Controls the sound
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);

  // Controls the visibility of the instructions screen
  const [isInstructionsVisible, setIsInstructionsVisible] = useState<boolean>(
    true
  );

  // When true, the game is active
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // When true, we show the "Thank you" screen
  const [isDone, setIsDone] = useState<boolean>(false);

  //  GAME TIMER //
  const [isGameTimerRunning, setIsGameTimerRunning] = useState<boolean>(false);
  const [timePerGame, setTimePerGame] = useState<number | undefined>(undefined);
  const [gameStartTime, setGameStartTime] = useState<number>(0);

  //  ACTION TIMER //
  const [isActionTimerRunning, setIsActionTimerRunning] = useState<boolean>(
    false
  );
  const [timePerAction, setTimePerAction] = useState<number | undefined>(
    undefined
  );
  const [actionStartTime, setActionStartTime] = useState<number>(0);

  // PROGRESS //

  // A foul is half a life. 2 are a complete lose of life, after which we reset
  const [fouls, setFouls] = useState<number>(0);

  // A fail is a complete lost of life
  const [fails, setFails] = useState<number>(0);

  // Keeps track of the score
  const [score, setScore] = useState<number>(0);

  const [level, setLevel] = useState<number>(-1);
  const previousLevel = useRef<number>();

  // This keeps track on whether the user had a succesful level or not
  const [isLevelSuccessful, setIsLevelSuccessful] = useState<
    boolean | undefined
  >(undefined);

  const [round, setRound] = useState<number>(-1);

  // This keeps track on whether the user had a succesful round or not
  const [isRoundSuccessful, setIsRoundSuccessful] = useState<boolean>(false);

  useEffect(() => {
    // If this is the first time we run and we see that the level has been set, there's no need to give the user any score, but we should change the state to indicate that the next run isn't the first run anymore
    if (isFirstRun && level > 0) {
      setIsFirstRun(false);
    }
    // If it's not the first run and out previous level (the one we've just completed) is higher than our current score, we should set that as our new score
    if (
      !isFirstRun &&
      level - 1 > score &&
      previousLevel.current &&
      level > previousLevel.current
    ) {
      setScore(level - 1);
    }

    // If this current level is lower than the previos level, meaning we've lost the last round, we should add a fail
    if (previousLevel.current && level < previousLevel.current) {
      setFails((fails) => fails + 1);
    }

    previousLevel.current = level;
  }, [level]);

  // Whenever we completely lose a life (another fail), we reset our fouls. Fouls don't persist between lives
  useEffect(() => {
    setFouls(0);
    if (fails === 3) {
      setIsDone(true);
      return;
    }
  }, [fails]);

  // Whenever we reach two fouls we should drop a level
  useEffect(() => {
    if (fouls === 2) {
      setLevel((level) => (level === 1 ? 1 : level - 1));
    }
  }, [fouls]);

  return (
    <gameInfoContext.Provider
      value={{
        //  GLOBAL //
        challenge,
        setChallenge,
        isSoundOn,
        setIsSoundOn,
        isInstructionsVisible,
        setIsInstructionsVisible,
        isPlaying,
        setIsPlaying,
        isDone,
        setIsDone,

        //  GAME TIMER //
        isGameTimerRunning,
        setIsGameTimerRunning,
        timePerGame,
        setTimePerGame,
        gameStartTime,
        setGameStartTime,

        //  ACTION TIMER //
        isActionTimerRunning,
        setIsActionTimerRunning,
        timePerAction,
        setTimePerAction,
        actionStartTime,
        setActionStartTime,

        //  PROGRESS //
        fouls,
        setFouls,
        fails,
        setFails,
        score,
        setScore,
        level,
        setLevel,
        isLevelSuccessful,
        setIsLevelSuccessful,
        round,
        setRound,
        isRoundSuccessful,
        setIsRoundSuccessful,
      }}
    >
      {children}
    </gameInfoContext.Provider>
  );
};
