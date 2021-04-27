import "./styles.scss";
import React, { useContext } from "react";

import strings from "../../../../constants/localizedStrings";
import WordsPerMinuteContainer from "../../content/games/wordsPerMinute/wpm-container";
import { gameInfoContext } from "../../../../providers/GameInfo";

const WordsPerMinuteInstructions = () => {
  const { setIsInstructionsVisible } = useContext(gameInfoContext);

  return (
    <div className="wpm-inst">
      <h1>{strings.instructionsTitle}</h1>
      <h2>
        {strings.wpmInstructionsLineOne}
        <br /> <br />
        {strings.wpmInstructionsLineTwo}
        <br /> <br />
        {strings.wpmInstructionsLineThree}
        <br />
        {strings.wpmInstructionsLineFour}
      </h2>
      <WordsPerMinuteContainer
        text="This is a sample text. The text you will see in the next screen will be different. Notice the green and red highlighting. Green indicates the text was typed correctly, while red indicates incorrect typing."
        userInput="This is a smaple texk. The teee you will see in the next screen will be different. Notice the green and res"
      />

      <div
        className="button button--green"
        onClick={() => setIsInstructionsVisible(false)}
      >
        {strings.iUnderstand}
      </div>

      {/* <WordsPerMinuteContainer
        text="This is a sample text. The text you will see in the next screen will be different. Notice the green and red highlighting. Green indicates the text was typed correctly, while red indicates incorrect typing."
        userInput="This is a smaple texk. The teee you will see in the next screen will be different. Notice the green and res"
      /> */}
    </div>
  );
};

export default WordsPerMinuteInstructions;
