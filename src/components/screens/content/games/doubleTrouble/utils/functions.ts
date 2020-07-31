import { DoubleTroubleObject } from "./classes";
import { returnZeroOrOne } from "../../utils/functions";
import { ZeroOne } from "../../../../../utils/interfaces";

// Reset the values of the test and options
export const resetTest = (
  currentTest: DoubleTroubleObject | null,
  currentOptions: DoubleTroubleObject[] | null,
  setTest: React.Dispatch<React.SetStateAction<DoubleTroubleObject | null>>,
  setOptions: React.Dispatch<
    React.SetStateAction<DoubleTroubleObject[] | null>
  >,
  startCountdown?: () => void
) => {
  // We create a new test
  let newTest = new DoubleTroubleObject(returnZeroOrOne(), returnZeroOrOne());

  // We set the first option
  let optionOne = new DoubleTroubleObject(returnZeroOrOne(), returnZeroOrOne());

  // According to what the values of that options are, we set the opposite to option 2
  let optionTwo = new DoubleTroubleObject(
    Math.abs(optionOne.text - 1) === 0 ? 0 : 1,
    Math.abs(optionOne.color - 1) === 0 ? 0 : 1
  );

  // We check that test doesn't repeat itself exactly, otherwise it would give the impression that it's stuck. First we check that options and test have been initiated at all(otherwise this is the first test and there is no comparison to make).
  // Then, we check if the new 'optionOne' is idential to options[0]. It will imply on options[1] being identical as well as the options are always opposited of eachother.
  // Then we check if the new test is identical to the new generated test. This one is optional, and depands on how hard we want it to be.
  // We can set this to 1 of 3 options, that will change how hard and confusing the test could potentially be:
  // 1. If we leave it as that, all the values have to be different than what they were in the previous test. There's no room for slight confusion at all.
  // 2. If we drop the test comparison, we allow for the test to be a little harder, by allowing for the options to be different but the test to be exactly the same, which means we'll be looking he same answer, but it'll be somewhere else.
  // 3. We change the '||' condition to '&&' between the two objects comparisons. That means that as long as either option OR the test itself are different, then we can consider it to be a new test. This is probably the hardest, because we allow for cases where the options ARE the same but the test is different. By impulse some users might want to click the same answer again immediatly after the first click didn't change the options for them, but an aware user would have noticed that while the options are the same, the test itself has changed.

  if (
    (currentOptions &&
      currentTest &&
      JSON.stringify(currentOptions[0]) === JSON.stringify(optionOne)) ||
    JSON.stringify(currentTest) === JSON.stringify(newTest)
  ) {
    resetTest(currentTest, currentOptions, setTest, setOptions);
    return;
  }

  if (startCountdown) startCountdown();

  setTest(newTest);

  setOptions([optionOne, optionTwo]);
};

// We compare the value of the meaning of the text the user chose (0 if "Red", 1 if "Blue"), with the value of the color of the test we've presented them with
export const handleChoice = (
  choiceText: ZeroOne,
  choice: ZeroOne,
  test: DoubleTroubleObject,
  setChoice: React.Dispatch<React.SetStateAction<ZeroOne | null>>,
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setIsIndicatorShowing: React.Dispatch<React.SetStateAction<boolean>>,
  playSound: (isCorrect: boolean) => void,
  resetTest: () => void
) => {
  setChoice(choice);
  let isChoiceCorrect = choiceText === test!.color;
  setIsCorrect(isChoiceCorrect);
  setScore((score: number) => (isChoiceCorrect ? score + 1 : score - 1));

  playSound(isChoiceCorrect);

  setIsIndicatorShowing(true);
  setTimeout(() => {
    setIsIndicatorShowing(false);
    resetTest();
  }, 400);
};

// Retrn the appropriate text according to the value. 0 return "Red", 1 return "Blue".
export const getText = (code: ZeroOne, strings: any) => {
  return code === 0 ? strings.red : strings.blue;
};
