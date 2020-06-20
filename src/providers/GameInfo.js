import React, { useState, useEffect } from "react";

export const GameInfoContext = React.createContext();

export const GameInfoProvider = ({ children }) => {
  // Sets the current challenge:
  // 0 - Double Trouble
  // 1 - Grammatical Reasoning
  const [challenge, setChallenge] = useState(1);

  // Controls the sound
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Controls the visibility of the instructions screen
  const [isInstructionsVisible, setIsInstructionsVisible] = useState(true);

  // When true, the game is active
  const [isPlaying, setIsPlaying] = useState(false);

  // When true, we show the "Thank you" screen
  const [isDone, setIsDone] = useState(false);

  // Keeps track of the score
  const [score, setScore] = useState(0);

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
      }}
    >
      {children}
    </GameInfoContext.Provider>
  );
};
