import "./styles.scss";
import React, { useContext } from "react";
import WordsPerMinuteContainer from "./wpm-container";
import { gameInfoContext } from "../../../../../providers/GameInfo";

const Wpm = () => {
  const { setIsDone } = useContext(gameInfoContext);
  return (
    <div className="wpm">
      <WordsPerMinuteContainer
        text="The fastest typing speed ever, 216 words per minute, was achieved by Stella Pajunas-Garnand from Chicago in 1946 in one minute on an IBM electric. As of 2005, writer Barbara Blackburn was the fastest English language typist in the world, according to The Guinness Book of World Records. Using the Dvorak Simplified Keyboard, she had maintained 150 wpm for 50 minutes, and 170 wpm for shorter periods, with a peak speed of 212 wpm. Blackburn, who failed her QWERTY typing class in high school, first encountered the Dvorak keyboard in 1938, quickly learned to achieve very high speeds, and occasionally toured giving speed-typing demonstrations during her secretarial career. She appeared on Late Night with David Letterman on January 24, 1985, but felt that Letterman made a spectacle of her. Blackburn died in April 2008."
        onComplete={() => {
          setIsDone(true);
        }}
      />
    </div>
  );
};

export default Wpm;
