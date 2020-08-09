import React, { useState, ReactNode } from "react";
import { ContextValues } from "../components/utils/interfaces";
import {
  Asset,
  Equation,
} from "../components/screens/content/games/operationSpan/utils/classes";

type Props = {
  children: ReactNode;
};

export const operationSpanContext = React.createContext<ContextValues>({});

export const OperationSpanProvider = ({ children }: Props) => {
  // This holds all of the images that were presented to the user, in the order which they were presented.
  const [providedOrder, setProvidedOrder] = useState<Asset[]>([]);

  // This holds all of the images that were presented to the user, in the order which they were presented.
  const [usedEquations, setUsedEquations] = useState<Equation[]>([]);

  // We use this to determine whether the user played or not. This helps us in our use effect to prevent from rendering the reorder component on level 1 befre the user has even played
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  return (
    <operationSpanContext.Provider
      value={{
        providedOrder,
        setProvidedOrder,
        userAnswers,
        setUserAnswers,
        usedEquations,
        setUsedEquations,
      }}
    >
      {children}
    </operationSpanContext.Provider>
  );
};
