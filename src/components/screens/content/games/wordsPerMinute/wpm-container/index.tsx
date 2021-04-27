import "./styles.scss";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { WpmContainerProps } from "./interfaces";
import { allowedChars } from "./constants";
import { gameInfoContext } from "../../../../../../providers/GameInfo";

const WordsPerMinuteContainer = (props: WpmContainerProps) => {
  const { text, userInput, onComplete } = props;

  const { stopwatch, setStopwatch, setScore, setAccuracy } = useContext(
    gameInfoContext
  );

  const [input, setInput] = useState(userInput || "");

  const [liveCharectersCount, setLiveCharectersCount] = useState<number>(0);
  const [liveErrorsCount, setLiveErrorsCount] = useState<number>(0);

  const [sentence, setSentence] = useState<Array<Array<JSX.Element>>>([]);

  // The function that handles the typing
  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key !== "Backspace") {
        setLiveCharectersCount((c) => c + 1);
        if (key !== text[Array.from(input).length]) {
          setLiveErrorsCount((c) => c + 1);
        }
      }

      if (allowedChars.includes(key)) {
        setInput((userInput) =>
          key === "Backspace" ? userInput.slice(0, -1) : userInput + key
        );
      }
    },
    [input, text]
  );

  // The instructions component shouldn't ever mess with the accuracy and/or score, as we don't pass to it an onComplete method, but to be certain, we reset both on first load

  useEffect(() => {
    setAccuracy(0);
    setScore(0);
  }, [setAccuracy, setScore]);

  useEffect(() => {
    const timer = () =>
      setTimeout(() => setStopwatch((t: number) => t + 1), 1000);
    const timerId = timer();
    return () => {
      clearTimeout(timerId);
    };
  }, [setStopwatch]);

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]);

  useEffect(() => {
    if (input.length === text.length && onComplete) {
      const words = text.length / 5;
      const errors = Array.from(text).filter(
        (char, index) => input[index] !== char
      ).length;
      const minutes = stopwatch / 60;
      const wpm = Math.round((words - errors) / minutes);
      setScore(wpm);

      const accuracy = Math.round(
        ((liveCharectersCount - liveErrorsCount) / liveCharectersCount) * 100
      );
      setAccuracy(accuracy);
      onComplete();
    }
  }, [
    input,
    text,
    onComplete,
    stopwatch,
    setScore,
    setAccuracy,
    liveErrorsCount,
    liveCharectersCount,
  ]);

  useEffect(() => {
    let word = [] as Array<JSX.Element>;
    let words = [] as Array<Array<JSX.Element>>;

    text.split("").forEach((char, index) => {
      // Basic classname of all elements
      let className = "wpm-container__test-text";

      // If the charecter is an empty one, meaning a space, we concatenate the space className too
      if (char === " ") className += " wpm-container__test-space";

      // If this charecter is in a position that has been filled by the user, we check if it was filled correctly or not, and concatenate the appropriate className
      if (index < input.length) {
        className += ` wpm-container__test-text--${
          input[index] === text[index] ? "correct" : "false"
        }`;
      }
      // else, if this is the current charecter that the user needs to fill, we concatenate the "first" className
      else if (index === input.length) {
        className += ` wpm-container__test-text--first`;
      }

      const character = (
        <div
          className={className}
          key={index}
          id={char === " " ? "space" : "char"}
        >
          {char}
        </div>
      );
      word = [...word, character];

      if (character.props["id"] === "space" || index + 1 === text.length) {
        words = [...words, word];
        word = [];
      }
    });

    setSentence(words);
  }, [text, input]);

  return (
    <div className="wpm-container">
      {sentence.map((word, index) => {
        return (
          <div style={{ display: "inline-block" }} key={"word" + index}>
            {word}
          </div>
        );
      })}
    </div>
  );
};

export default WordsPerMinuteContainer;
