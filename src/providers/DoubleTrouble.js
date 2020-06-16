import React, { useState } from "react";

export const DoubleTroubleContext = React.createContext();

export const DoubleTroubleProvider = ({ children }) => {

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
    <DoubleTroubleContext.Provider
      value={{
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
    </DoubleTroubleContext.Provider>
  );
};
