import { returnZeroOrOne } from "../../utils/functions";
import relationships from "./relationships";
import { GrammaticalReasoningTest } from "./classes";
import { ZeroOne } from "../../../../../utils/interfaces";

// Reset the values of the test and options
export const startTest = (
  currentTest: GrammaticalReasoningTest | null,
  setTest: React.Dispatch<
    React.SetStateAction<GrammaticalReasoningTest | null>
  >,
  startCountdown?: () => void
) => {
  const drawingOuterShape = returnZeroOrOne();
  const drawingOuterColor = returnZeroOrOne();
  const first = returnZeroOrOne();
  const relationship =
    relationships[Math.floor(Math.random() * relationships.length)];

  if (
    currentTest &&
    drawingOuterShape === currentTest.illustration.shapes[0] &&
    drawingOuterColor === currentTest.illustration.colors[0] &&
    first === currentTest.first &&
    relationship.text === currentTest.relationship.text
  ) {
    startTest(currentTest, setTest, startCountdown);
    return;
  }

  if (startCountdown) startCountdown();

  // We set the whole test as one object, with these values:
  // 1. "illustration" holds the values that define the drawing. The first element in both arrays represents the values of the outer shape, and he second of the inner shape.
  // 2. "first" holds the value of the first shape that is introduced in the statement (e.g. "Circle is...").
  // 3. "last" holds the value of the last shape that is introduced in the statement (e.g. "... than square.")
  // 4. "relatioship" holds the relation between the two shapes, and is picked randomally form the relationships array (e.g. "... is encapsulated by ...")
  setTest(
    new GrammaticalReasoningTest(
      {
        shapes: [drawingOuterShape, Math.abs(drawingOuterShape - 1)],
        colors: [drawingOuterColor, Math.abs(drawingOuterColor - 1)],
      },
      first,
      Math.abs(first - 1),
      relationship
    )
  );
};

// To check if the user was right in their guese or not, we first check if the statement itself is correct or not, and than compare it to what the user chose.
// If the first shape in the illustration.shapes array is 0, meaning a circle, then we know that the circle is the bigger shape in the current test. Thus, for the statement to be true, then either the relatioship should suggest bigger with the "first" shape being circle as well, or it should suggest smaller, with the "first" shape being a square.
// For square, it is simply the opposite.
export const handleChoice = (
  choiceBool: boolean,
  choice: ZeroOne,
  setChoice: React.Dispatch<React.SetStateAction<ZeroOne | undefined>>,
  test: GrammaticalReasoningTest,
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setIsIndicatorShowing: React.Dispatch<React.SetStateAction<boolean>>,
  playSound: (isCorrect: boolean) => void,
  resetTest: () => void
) => {
  setChoice(choice);

  // This checks if the statement combined with the illustration creates a truthy example
  let isStatementTrue =
    test.illustration.shapes[0] === 0
      ? (test.relationship.value === 1 && test.first === 0) ||
        (test.relationship.value === 0 && test.first === 1)
      : (test.relationship.value === 1 && test.first === 1) ||
        (test.relationship.value === 0 && test.first === 0);

  // We then check if the user marked it correctly as truthy or falsy
  let isChoiceCorrect = isStatementTrue === choiceBool;

  // We set the isCorrect value, so that the game indicator knows what indicator to show the user
  setIsCorrect(isChoiceCorrect);

  setScore((s) => (isChoiceCorrect ? s + 1 : s - 1));
  playSound(isChoiceCorrect);

  setIsIndicatorShowing(true);
  setTimeout(() => {
    resetTest();
    setIsIndicatorShowing(false);
  }, 400);
};

// We return a shape's text based on code.
// 0 = circle, 1 = square
export const getShape = (code: ZeroOne) => {
  return code === 0 ? "circle" : "square";
};

// We build the statement.
export const getText = (test: GrammaticalReasoningTest) => {
  const text = `${getShape(test.first)} ${test.relationship.text} ${getShape(
    test.last
  )}`;
  return text[0].toUpperCase() + text.slice(1);
};

// We get the color of the shapes. This has nothing to do to whether it is a circle or a square and it is complately random. Either yellow or blue.
export const getColor = (code: ZeroOne) => {
  return code === 0 ? "#FFC416" : "#1170FE";
};

// we get the radius of the inner and outher shapes.
// 0 is always a circle, so 100% radius.
// 1 is a square, so 0 radius.
export const getRadius = (code: ZeroOne) => {
  return code === 0 ? "100%" : "0%";
};
