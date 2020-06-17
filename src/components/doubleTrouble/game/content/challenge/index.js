import "./styles.scss";
import React, { useState, useContext, useEffect } from "react";

import { DoubleTroubleContext } from "../../../../../providers/DoubleTrouble";
import strings from "../../../../../constants/localizedStrings";

// We use 0 and 1 accross the challnege to define red & blue, both as text and as color. When he user makes a choice, we compare the value of the text that they picked, with the color of the test we've presented them with

const Challenge = () => {
  const { setScore } = useContext(DoubleTroubleContext);

  const [test, setTest] = useState(null);
  const [options, setOptions] = useState(null);

  // Load the first challenge on first render
  useEffect(() => {
    resetTest();
  }, []);

  // Return either 0 or 1
  const returnZeroOrOne = () => {
    return Math.floor(Math.random() * 2);
  };

  // Reset the values of the test and options
  const resetTest = () => {
    setTest({ color: returnZeroOrOne(), text: returnZeroOrOne() });

    // We set the first option, and then according to what the values of that options are, we set the opposite to option 2
    let optionOne = { color: returnZeroOrOne(), text: returnZeroOrOne() };
    setOptions([
      optionOne,
      {
        color: Math.abs(optionOne.color - 1),
        text: Math.abs(optionOne.text - 1),
      },
    ]);
  };

  // We compare the value of the meaning of the text the user chose (0 if "Red", 1 if "Blue"), with the value of the color of the test we've presented them with
  const handleChoice = (choice) => {
    setScore((s) => (choice === test.color ? s + 1 : s - 1));
    resetTest();
  };

  // Retrn the appropriate text according to the value. 0 return "Red", 1 return "Blue".
  const getText = (code) => {
    return code === 0 ? strings.red : strings.blue;
  };

  return test && options ? (
    <div className="challenge">
      <div className="challenge__container">
        <div
          className={
            test.color === 0 ? "choice choice--red" : "choice choice--blue"
          }
        >
          {getText(test.text)}
        </div>
        <div className="challenge__options">
          <div
            className={
              options[0].color === 0
                ? "choice choice--border choice--red clickable"
                : "choice choice--border choice--blue clickable"
            }
            onClick={() => handleChoice(options[0].text)}
          >
            {getText(options[0].text)}
          </div>
          <div
            className={
              options[1].color === 0
                ? "choice choice--border choice--red clickable"
                : "choice choice--border choice--blue clickable"
            }
            onClick={() => handleChoice(options[1].text)}
          >
            {getText(options[1].text)}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Challenge;
