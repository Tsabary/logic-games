import "./styles.scss";
import React, { useState, useContext, useEffect } from "react";

import { GameInfoContext } from "../../../../providers/GameInfo";
import strings from "../../../../constants/localizedStrings";
import { returnZeroOrOne } from "../utils/functions";
import { playCorrect, playWrong } from "../../../../sounds/playFunctions";
import { ReactComponent as Check } from "../../../assets/general/check.svg";
import { ReactComponent as X } from "../../../assets/general/x.svg";

// We use 0 and 1 accross the challnege to define red & blue, both as text and as color. When he user makes a choice, we compare the value of the text that they picked, with the color of the test we've presented them with

const GrammaticalReasoning = () => {
  const { setScore, isSoundOn } = useContext(GameInfoContext);

  const [test, setTest] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [choice, setChoice] = useState(null);
  const [isIndicatorShowing, setIsIndicatorShowing] = useState(false);

  // Load the first challenge on first render
  useEffect(() => {
    resetTest(test);
  }, []);

  // These are all the possible "relationships" between the square an the circle. Their values are based on what they mean for the first shape that is introduced.
  // Value of 1 means that the first shape is bigger than the one following it, and 0 means that it is smaller.
  const relationships = [
    { text: "is bigger than", value: 1 },
    { text: "is not bigger than", value: 0 },
    { text: "is smaller than", value: 0 },
    { text: "is not smaller than", value: 1 },
    { text: "is contained by", value: 0 },
    { text: "is not contained by", value: 1 },
    { text: "encapsulates", value: 1 },
    { text: "does not encapsulate", value: 0 },
    { text: "is encapsulated by", value: 0 },
    { text: "is not encapsulated by", value: 1 },
    { text: "contains", value: 1 },
    { text: "does not contain", value: 0 },
  ];

  // Reset the values of the test and options
  const resetTest = (curTest) => {
    const drawingOuterShape = returnZeroOrOne();
    const drawingOuterColor = returnZeroOrOne();
    const first = returnZeroOrOne();
    const relationship =
      relationships[Math.floor(Math.random() * relationships.length)];

    if (
      curTest &&
      drawingOuterShape === curTest.illustration.shapes[0] &&
      drawingOuterColor === curTest.illustration.colors[0] &&
      first === curTest.first &&
      relationship === curTest.relationship
    ) {
      resetTest(curTest);
      return;
    }

    // We set the whole test as one object, with these values:
    // 1. "illustration" holds the values that define the drawing. The first element in both arrays represents the values of the outer shape, and he second of the inner shape.
    // 2. "first" holds the value of the first shape that is introduced in the statement (e.g. "Circle is...").
    // 3. "last" holds the value of the last shape that is introduced in the statement (e.g. "... than square.")
    // 4. "relatioship" holds the relation between the two shapes, and is picked randomally form the relationships array (e.g. "... is encapsulated by ...")
    setTest({
      illustration: {
        shapes: [drawingOuterShape, Math.abs(drawingOuterShape - 1)],
        colors: [drawingOuterColor, Math.abs(drawingOuterColor - 1)],
      },
      first,
      last: Math.abs(first - 1),
      relationship,
    });
  };

  // To check if the user was right in their guese or not, we first check if the statement itself is correct or not, and than compare it to what the user chose.
  // If the first shape in the illustration.shapes array is 0, meaning a circle, then we know that the circle is the bigger shape in the current test. Thus, for the statement to be true, then either the relatioship should suggest bigger with the "first" shape being circle as well, or it should suggest smaller, with the "first" shape being a square.
  // For square, it is simply the opposite.
  const handleChoice = (choiceBool, choice) => {
    setChoice(choice);
    let isStatementTrue =
      test.illustration.shapes[0] === 0
        ? (test.relationship.value === 1 && test.first === 0) ||
          (test.relationship.value === 0 && test.first === 1)
        : (test.relationship.value === 1 && test.first === 1) ||
          (test.relationship.value === 0 && test.first === 0);
    let isChoiceCorrect = isStatementTrue === choiceBool;

    setIsCorrect(isChoiceCorrect);

    setScore((s) => (isChoiceCorrect ? s + 1 : s - 1));
    if (isSoundOn) isChoiceCorrect ? playCorrect.play() : playWrong.play();

    setIsIndicatorShowing(true);
    setTimeout(() => {
      resetTest(test);
      setIsIndicatorShowing(false);
    }, 500);
  };

  // We return a shape's text based on code.
  // 0 = circle, 1 = square
  const getShape = (code) => {
    return code === 0 ? "circle" : "square";
  };

  // We build the statement.
  const getText = (test) => {
    const text = `${getShape(test.first)} ${test.relationship.text} ${getShape(
      test.last
    )}`;
    return text[0].toUpperCase() + text.slice(1);
  };

  // We get the color of the shapes. This has nothing to do to whether it is a circle or a square and it is complately random. Either yellow or blue.
  const getColor = (code) => {
    return code === 0 ? "#FFC416" : "#1170FE";
  };

  // we get the radius of the inner and outher shapes.
  // 0 is always a circle, so 100% radius.
  // 1 is a square, so 0 radius.
  const getRadius = (code) => {
    return code === 0 ? "100%" : "0%";
  };

  return test ? (
    <div className="gram-reas">
      <div className="gram-reas__container">
        <div
          className="gram-reas__challenge--text"
          style={{ visibility: isIndicatorShowing ? "hidden" : "visible" }}
        >
          {getText(test)}
        </div>

        <div
          className="gram-reas__challenge--outer"
          style={{
            backgroundColor: getColor(test.illustration.colors[0]),
            borderRadius: getRadius(test.illustration.shapes[0]),
            visibility: isIndicatorShowing ? "hidden" : "visible",
          }}
        >
          <div
            className="gram-reas__challenge--inner"
            style={{
              backgroundColor: getColor(test.illustration.colors[1]),
              borderRadius: getRadius(test.illustration.shapes[1]),
            }}
          />
        </div>

        <div className="gram-reas__options">
          <div
            className="choice choice--border choice--red clickable"
            onClick={() => handleChoice(false, 0)}
          >
            {strings.false}
            {isIndicatorShowing && choice === 0 ? (
              <div className="choice__hint-container choice__hint-container--left">
                <div
                  className={
                    isCorrect
                      ? "choice__hint choice__hint--correct"
                      : "choice__hint choice__hint--wrong"
                  }
                >
                  {isCorrect ? (
                    <Check className="choice__hint-icon--correct" />
                  ) : (
                    <X className="choice__hint-icon--wrong" />
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <div
            className="choice choice--border choice--green clickable"
            onClick={() => handleChoice(true, 1)}
          >
            {strings.true}
            {isIndicatorShowing && choice === 1 ? (
              <div className="choice__hint-container choice__hint-container--right">
                <div
                  className={
                    isCorrect
                      ? "choice__hint choice__hint--correct"
                      : "choice__hint choice__hint--wrong"
                  }
                >
                  {isCorrect ? (
                    <Check className="choice__hint-icon--correct" />
                  ) : (
                    <X className="choice__hint-icon--wrong" />
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default GrammaticalReasoning;
