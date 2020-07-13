import React, { useState } from "react";

export const GameInfoContext = React.createContext();

export const GameInfoProvider = ({ children }) => {
  // Sets the current challenge:
  // 0 - Double Trouble
  // 1 - Grammatical Reasoning
  // 2 - Corsi Block
  const [challenge, setChallenge] = useState(2);

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

  // For games that are based on time, this is where we keep track of how much time the player has left
  const gameLength = 120;
  const [timeLeft, setTimeLeft] = useState(gameLength);

  // For games that are based on lives, this is where we keep track of how many lives the player has left
  const lives = 3;
  const [livesLeft, setLivesLeft] = useState(lives);

  // This keeps track of how many fouls we've made. In Corsi Block for example, a foul is taking more than 3 seconds to make a choice
  const [fouls, setFouls] = useState([]);

  // Could this be moved to the games themselves, rather then in this higher level context?
  const [isIndicatorShowing, setIsIndicatorShowing] = useState(false);

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
        livesLeft,
        setLivesLeft,
        gameLength,
        isIndicatorShowing,
        setIsIndicatorShowing,
        fouls,
        setFouls,
      }}
    >
      {children}
    </GameInfoContext.Provider>
  );
};
