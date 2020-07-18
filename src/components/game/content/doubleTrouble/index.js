import "./styles.scss";
import React, { useState, useContext, useEffect } from "react";

import { GameInfoContext } from "../../../../providers/GameInfo";
import strings from "../../../../constants/localizedStrings";
import { playCorrect, playWrong } from "../../../../sounds/playFunctions";
import { ReactSVG } from "react-svg";

// We use 0 and 1 accross the challnege to define red & blue, both as text and as color. When he user makes a choice, we compare the value of the text that they picked, with the color of the test we've presented them with

const DoubleTrouble = () => {
  const { setScore, isSoundOn } = useContext(GameInfoContext);

  const [test, setTest] = useState(null);
  const [options, setOptions] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [choice, setChoice] = useState(null);
  const [isIndicatorShowing, setIsIndicatorShowing] = useState(false);

  // Load the first challenge on first render
  useEffect(() => {
    resetTest(test, options);
  }, []);

  // Return either 0 or 1
  const returnZeroOrOne = () => {
    return Math.floor(Math.random() * 2);
  };

  // Reset the values of the test and options
  const resetTest = (curTest, curOptions) => {
    // We create a new test
    let newTest = { color: returnZeroOrOne(), text: returnZeroOrOne() };

    // We set the first option, and then according to what the values of that options are, we set the opposite to option 2
    let optionOne = { color: returnZeroOrOne(), text: returnZeroOrOne() };

    // We check that test doesn't repeat itself exactly, otherwise it would give the impression that it's stuck. First we check that options and test have been initiated at all(otherwise this is the first test and there is no comparison to make).
    // Then, we check if the new 'optionOne' is idential to options[0]. It will imply on options[1] being identical as well as the options are always opposited of eachother.
    // Then we check if the new test is identical to the new generated test. This one is optional, and depands on how hard we want it to be.
    // We can set this to 1 of 3 options, that will change how hard and confusing the test could potentially be:
    // 1. If we leave it as that, all the values have to be different than what they were in the previous test. There's no room for slight confusion at all.
    // 2. If we drop the test comparison, we allow for the test to be a little harder, by allowing for the options to be different but the test to be exactly the same, which means we'll be looking he same answer, but it'll be somewhere else.
    // 3. We change the '||' condition to '&&' between the two objects comparisons. That means that as long as either option OR the test itself are different, then we can consider it to be a new test. This is probably the hardest, because we allow for cases where the options ARE the same but the test is different. By impulse some users might want to click the same answer again immediatly after the first click didn't change the options for them, but an aware user would have noticed that while the options are the same, the test itself has changed.

    if (
      (curOptions &&
        curTest &&
        JSON.stringify(curOptions[0]) === JSON.stringify(optionOne)) ||
      JSON.stringify(curTest) === JSON.stringify(newTest)
    ) {
      resetTest(test, options);
      return;
    }

    setTest(newTest);
    setOptions([
      optionOne,
      {
        color: Math.abs(optionOne.color - 1),
        text: Math.abs(optionOne.text - 1),
      },
    ]);
  };

  // We compare the value of the meaning of the text the user chose (0 if "Red", 1 if "Blue"), with the value of the color of the test we've presented them with
  const handleChoice = (choiceText, choice) => {
    setChoice(choice);
    let isChoiceCorrect = choiceText === test.color;
    setIsCorrect(isChoiceCorrect);
    setScore((s) => (isChoiceCorrect ? s + 1 : s - 1));
    if (isSoundOn) isChoiceCorrect ? playCorrect.play() : playWrong.play();

    setIsIndicatorShowing(true);
    setTimeout(() => {
      setIsIndicatorShowing(false);
      resetTest(test, options);
    }, 250);
  };

  // Retrn the appropriate text according to the value. 0 return "Red", 1 return "Blue".
  const getText = (code) => {
    return code === 0 ? strings.red : strings.blue;
  };

  return test && options ? (
    <div className="double-trouble">
      <div className="double-trouble__container">
        <div
          className={
            test.color === 0 ? "choice choice--red" : "choice choice--blue"
          }
          style={{ visibility: isIndicatorShowing ? "hidden" : "visible" }}
        >
          {getText(test.text)}
        </div>

        <div className="double-trouble__options">
          <div
            className={
              options[0].color === 0
                ? "choice choice--border choice--red clickable"
                : "choice choice--border choice--blue clickable"
            }
            onClick={() => handleChoice(options[0].text, 0)}
          >
            {getText(options[0].text)}
            {isIndicatorShowing && choice === 0 ? (
              <div className="choice__hint-container choice__hint-container--left">
                <div
                  className={
                    isCorrect
                      ? "choice__hint choice__hint--correct"
                      : "choice__hint choice__hint--wrong"
                  }
                >
                  <ReactSVG
                    src={isCorrect ? "../assets/check.svg" : "../assets/x.svg"}
                    wrapper="div"
                    beforeInjection={(svg) => {
                      svg.classList.add(
                        isCorrect
                          ? "choice__hint-icon--correct"
                          : "choice__hint-icon--wrong"
                      );
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div
            className={
              options[1].color === 0
                ? "choice choice--border choice--red clickable"
                : "choice choice--border choice--blue clickable"
            }
            onClick={() => handleChoice(options[1].text, 1)}
          >
            {getText(options[1].text)}
            {isIndicatorShowing && choice === 1 ? (
              <div className="choice__hint-container choice__hint-container--right">
                <div
                  className={
                    isCorrect
                      ? "choice__hint choice__hint--correct"
                      : "choice__hint choice__hint--wrong"
                  }
                >
                  <ReactSVG
                    src={isCorrect ? "../assets/check.svg" : "../assets/x.svg"}
                    wrapper="div"
                    beforeInjection={(svg) => {
                      svg.classList.add(
                        isCorrect
                          ? "choice__hint-icon--correct"
                          : "choice__hint-icon--wrong"
                      );
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default DoubleTrouble;
