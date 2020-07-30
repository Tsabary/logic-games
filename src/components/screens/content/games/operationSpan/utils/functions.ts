export class Asset {
  id: string;
  icon: JSX.Element;
  constructor(id: string, icon: JSX.Element) {
    this.id = id;
    this.icon = icon;
  }
}

// This fills the conditions required so the level indicator component is visible
export const makeLevelIndicatorVisible = (
  setIsLevelIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsReorderingVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDistractionQuestionVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // We set the level indicator component visibility to visible
  setIsLevelIndicatorVisible(true);

  // We make the other components visibility to false
  setIsReorderingVisible(false);
  setIsImageVisible(false);
  setIsDistractionQuestionVisible(false);

  console.log("setting providedOrder SHOULD MAKE LEVEL INDICATOR VISIBLE");

};

// This fills the conditions required so reorder component is visible
export const makeReorderVisible = (
  setIsLevelIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsReorderingVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDistractionQuestionVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // We set the reorder component visibility to visible
  setIsReorderingVisible(true);

  // We make the other components visibility to false
  setIsLevelIndicatorVisible(false);
  setIsImageVisible(false);
  setIsDistractionQuestionVisible(false);
};

// This fills the conditions required so the image component is visible
export const makeImageVisible = (
  setIsLevelIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsReorderingVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDistractionQuestionVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  addImageToSequence: () => void
) => {

  console.log("setting providedOrder SHOULD MAKE IMAGE VISIBLE");

  // We add one image to our image sequence array
  addImageToSequence();

  // We set the icon's visibility to visible
  setIsImageVisible(true);

  // We make the other components visibility to false
  setIsDistractionQuestionVisible(false);
  setIsReorderingVisible(false);
  setIsLevelIndicatorVisible(false);
};

export const makeDistractionQuestionVisible = (
  setIsLevelIndicatorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsReorderingVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDistractionQuestionVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // We set the distraction question's component visibility to visible
  setIsDistractionQuestionVisible(true);

  setIsImageVisible(false);
  setIsReorderingVisible(false);
  setIsLevelIndicatorVisible(false);
};

// This functions lunches a sequence of actions to start a new level
export const newLevel = (
  setUserAnswers: React.Dispatch<React.SetStateAction<boolean[]>>,
  setProvidedOrder: React.Dispatch<React.SetStateAction<Asset[]>>,
  makeLevelIndicatorVisible: () => void
) => {
  setUserAnswers([]);
  setProvidedOrder([]);
  makeLevelIndicatorVisible();

  console.log("setting providedOrder to nothing");
};

// This is where we handle whether the user succeeded in ordering the assets or no
export const handleSubmit = (
  isCorrect: boolean,
  handleSuccess: () => void,
  handleFail: () => void,
  newLevel: () => void,
  moreRounds: boolean
) => {
  if (!isCorrect)
    console.log(
      "operation span flow - it should kick in the drop level function"
    );

  isCorrect ? handleSuccess() : handleFail();

  if (moreRounds) newLevel();
};

// This is where we respond to the answer for the distraction questions.
export const handleAnswer = (
  setUserAnswers: React.Dispatch<React.SetStateAction<boolean[]>>,
  setFouls: React.Dispatch<React.SetStateAction<number>>,
  makeImageVisible: () => void,
  isCorrect: boolean,
  fails: number,
  providedOrder: Asset[],
  level: number
) => {
  setUserAnswers((answers: boolean[]) => [...answers, isCorrect]);

  // If the user didn't answer correctly they get a fail
  if (!isCorrect) setFouls((fouls) => fouls + 1);

  // If the user was correct, or if they at least have no fails yet then we call the next set. If they are not correct and they have fails alreay, then that mean that the fails count would hit 2 in a moment and the game will reset on a new level
  if ((isCorrect || fails < 3) && providedOrder.length !== level) {
    makeImageVisible();
  }
};

export const addImageToSequence = (
  iconAssets: any[],
  providedOrder: Asset[],
  setProvidedOrder: React.Dispatch<React.SetStateAction<Asset[]>>
) => {
  // To prevent repeating the same image twice, we need to see which images have already been presented to the user. This variable holds he index of all the indexes of images that havent been presented to the user yet.
  // We create a map of all asset indexes, and then filter by checking for every index if it exists in the images array or not.
  const remainingIconsIndexes = iconAssets
    .map((ic) => ic.id)
    .filter((ic) => !providedOrder.map((i) => i.id).includes(ic));

  // Then, using our list of remaining indexes, we extract a random item/index from that list
  const newIconIndex =
    remainingIconsIndexes[
      Math.floor(Math.random() * remainingIconsIndexes.length)
    ];

  // Then, we add another icon to our sequence by filtering ou icon assets array to match the new randm index we've just created
  setProvidedOrder((ics) => [
    ...ics,
    iconAssets.filter((ic) => ic.id === newIconIndex)[0],
  ]);

  console.log("setting providedOrder to have another image");
};

// export const loselife = (
//   setIsRoundSuccessful: React.Dispatch<React.SetStateAction<number>>,
//   setLevel: React.Dispatch<React.SetStateAction<number>>,
//   setLivesLeft: React.Dispatch<React.SetStateAction<number>>,
//   setFails: React.Dispatch<React.SetStateAction<number>>,
//   setUserAnswers: React.Dispatch<React.SetStateAction<boolean[]>>,
//   setProvidedOrder: React.Dispatch<React.SetStateAction<Asset[]>>,
//   setUserOrder: React.Dispatch<React.SetStateAction<number[]>>
// ) => {
//   resetSession(setFails, setUserAnswers, setProvidedOrder, setUserOrder);
//   setIsRoundSuccessful(2);
//   setLevel((level: number) => (level === 1 ? 1 : level - 1));
//   setLivesLeft((lives: number) => lives - 1);
// };

// export const jumpLevel = (
//   setIsRoundSuccessful: React.Dispatch<React.SetStateAction<number>>,
//   setLevel: React.Dispatch<React.SetStateAction<number>>,
//   setScore: React.Dispatch<React.SetStateAction<number>>,
//   setFails: React.Dispatch<React.SetStateAction<number>>,
//   setUserAnswers: React.Dispatch<React.SetStateAction<boolean[]>>,
//   setProvidedOrder: React.Dispatch<React.SetStateAction<Asset[]>>,
//   setUserOrder: React.Dispatch<React.SetStateAction<number[]>>,
//   level: number,
//   score: number
// ) => {
//   resetSession(setFails, setUserAnswers, setProvidedOrder, setUserOrder);
//   setIsRoundSuccessful(1);
//   setLevel((lvl) => lvl + 1);
//   if (level > score) setScore(level);
// };
