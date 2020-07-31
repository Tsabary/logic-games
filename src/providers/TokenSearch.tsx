import React, { useState, ReactNode } from "react";
import { ContextValues } from "../components/utils/interfaces";

type Props = {
  children: ReactNode;
};

export const tokenSearchContext = React.createContext<ContextValues>({});

export const TokenSearchProvider = ({ children }: Props) => {
  // This is the pattern of boxes that the user will have on screen to click for the level. It only changes when the level changes.
  const [pattern, setPattern] = useState<number[]>([]);

  // These are the indexes of all the boxes in which the user have found a token for this level. This resets when the level changes.
  const [discoveredTokens, setDiscoveredTokens] = useState<number[]>([]);

  // This is where the token is hidden. This changes every new round
  const [tokenPlacement, setTokenPlacement] = useState<number>(-1);

  // These are the indexes of all the boxes the user clicked in the round. This resets when the user finds the token and a new ound starts, or when the user clicks a box that they've previousy clicked and a new round starts
  const [roundGuesses, setRoundGuesses] = useState<number[]>([]);

  return (
    <tokenSearchContext.Provider
      value={{
        pattern,
        setPattern,
        discoveredTokens,
        setDiscoveredTokens,
        tokenPlacement,
        setTokenPlacement,
        roundGuesses,
        setRoundGuesses,
      }}
    >
      {children}
    </tokenSearchContext.Provider>
  );
};
