import { Equation } from "../../../assets/equations";

// This is where we respond to the answer for the distraction questions.
export const submitAnswer = (
  setUserAnswers: (isCorrect: boolean) => void,
  fouls: number,
  setFouls: () => void,
  isCorrect: boolean,
  dropLevel: () => void
) => {
  setUserAnswers(isCorrect);

  /**
   * If the user didn't answer correctly we react in one of two ways:
   * - If they have no previous fouls, we call the set fouls function which gives them one foul.
   * - If hey already had fouls, meaning this would be thir second (2 fouls max) then instead of giving them another fouls we call the drop level action. The reason we do that is because we want to call the levelIndicator
   */
  if (!isCorrect) {
    if (!fouls) {
      setFouls();
    } else {
      dropLevel();
    }
  }
};

// This is where we check the answer for the distraction questions. True or false, we immediatly stop the count, and then we call the handleAnswer method we got from the parent component, so it'll handle this fail on it's side.
export const checkAnswer = (
  isCorrect: boolean,
  buttonNumber: number,
  stopCounting: () => void,
  playSuccessIndicationSound: (isCorrect: boolean) => void,
  setAnswer: (buttonNumber: number) => void,
  showIndicator: () => void,
  hideIndicator: () => void,
  submitAnswer: () => void
) => {
  stopCounting();
  playSuccessIndicationSound(isCorrect);
  setAnswer(buttonNumber);
  showIndicator();

  setTimeout(() => {
    hideIndicator();
    submitAnswer();
  }, 1000);
};

export const getNewChallenge = (
  equations: Equation[],
  usedEquations: Equation[]
): Equation => {
  // To prevent repeating the same equation twice, we need to see which equations have already been presented to the user. This variable holds he index of all the indexes of equations that havent been presented to the user yet.
  // We create a map of all equation indexes, and then filter by checking for every index if it exists in the usedEquations array or not.
  const remainingEquationsIndexes = equations
    .map((eq) => eq.id)
    .filter((eq) => !usedEquations.map((i) => i.id).includes(eq));

  // Then, using our list of remaining indexes, we extract a random item/index from that list
  const newEquationIndex =
    remainingEquationsIndexes[
      Math.floor(Math.random() * remainingEquationsIndexes.length)
    ];

  return equations.filter((eq) => eq.id === newEquationIndex)[0];
};
