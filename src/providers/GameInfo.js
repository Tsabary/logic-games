import React, { useState } from "react";

export const GameInfoContext = React.createContext();

export const GameInfoProvider = ({ children }) => {
  // Sets the current challenge:
  // 0 - Double Trouble
  // 1 - Grammatical Reasoning
  // 2 - Corsi Block
  // 3 - Operation Span
  // 4 - Token Search

  const [challenge, setChallenge] = useState(4);

  // Controls the sound
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Controls the visibility of the instructions screen
  const [isInstructionsVisible, setIsInstructionsVisible] = useState(true);

  // When true, the game is active
  const [isPlaying, setIsPlaying] = useState(false);

  // When true, we show the "Thank you" screen
  const [isDone, setIsDone] = useState(false);

  // Keeps track of the score
  const [score, setScore] = useState(0);

  // For games that are based on time, this is where we keep track of how much time the player has left
  const gameLength = 90;
  const [timeLeft, setTimeLeft] = useState(gameLength);

  const [isActionTimerRunning, setIsActionTimerRunning] = useState(false);
  const [timePerAction, setTimePerAction] = useState(null);
  const [actionStartTime, setActionStartTime] = useState(0);


  // A foul is half a life. 2 are a complete lose of life
  const [fouls, setFouls] = useState([]);

  // A fail is a complete lost of life
  const [fails, setFails] = useState(0);

  return (
    <GameInfoContext.Provider
      value={{
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
        score,
        setScore,
        timeLeft,
        setTimeLeft,
        isActionTimerRunning,
        setIsActionTimerRunning,
        timePerAction,
        setTimePerAction,
        actionStartTime,
        setActionStartTime,
        // actionTimeLeft,
        // setActionTimeLeft,
        // livesLeft,
        // setLivesLeft,
        gameLength,
        fouls,
        setFouls,
        fails,
        setFails,
      }}
    >
      {children}
    </GameInfoContext.Provider>
  );
};
