import "./styles.scss";
import React, { useState, useEffect, useContext, useRef } from "react";

import { GameInfoContext } from "../../../../providers/GameInfo";

import WrongIndicator from "./wrongIndicator";
import CorrectIndicator from "./correctIndicator";
import Block from "./block";

const CorsiBlock = () => {
  const { setLivesLeft, score, setScore, fouls, setFouls } = useContext(
    GameInfoContext
  );

  const [lvl, setLvl] = useState(10);
  const [sequence, setSequene] = useState([]);
  const [replay, setReplay] = useState([]);
  const [flashingBlock, setFlashingBlock] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [isCorrectIndicatorShowing, setIsCorrectIndicatorShowing] = useState(
    null
  );
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isLevelShowing, setIsLevelShowing] = useState(true);

  const [timeToAction, setTimeToAction] = useState(0);
  const [startTime, setStartTime] = useState(0);
  let interval = useRef(null);

  useEffect(() => {
    // We change how much time has elapsed every 100 milliseconds.
    // We use timesamps to set the time rather than just relying on the interval doing its job, to prevent the timer from stopping when the tab is out of focus
    interval.current = setInterval(() => {
      setTimeToAction(() => Date.now() - startTime);
    }, 100);
    return () => clearInterval(interval.current);
  }, [startTime]);

  // When the game first loads and whenever the evel changes, we want to show the level indicator, which is the first step in starting a new sequence
  useEffect(() => {
    transition(lvl);
  }, [lvl]);

  // This controls our transition view. We reset all our values first, then make the level screen visible. We then set a timeout that'll make that screen hidden again and would start our new sequence
  const transition = (lvl) => {
    reset();
    setIsLevelShowing(true);

    setTimeout(() => {
      setIsLevelShowing(false);
      runSequence(lvl);
    }, 3000);
  };

  // This runs the test sequence and flashes different blocks randomally.
  const runSequence = (lvl) => {
    let runs = 0;

    const flashInterval = setInterval(() => {
      // Stop flashing when the number of flashes matches our current level
      if (runs === lvl) {
        clearInterval(flashInterval);
        setIsRunning(false);
        setStartTime(Date.now());
        setTimeToAction(0);
      } else {
        flash(() => runs++);
      }
    }, 1000);
  };

  const flash = (cb) => {
    // Choose randomally what block would flash next
    const flshBlck = Math.floor(Math.random() * 16);
    // Set it to our sate so it'll re render and would flash
    setFlashingBlock(flshBlck);
    // Store the value of that block that was chose to our sequence state for later comparison.
    setSequene((seq) => [...seq, flshBlck]);
    cb();
  };

  // This hook listens to hour replay and checks if we got it correctly. When the number of replays matches our level tha meant that our replay is done. At that point, we compare the test sequence to our replay sequence and follow in accordance. We lose a life if it's not a win and we also adjust the current level (one up or one down).
  useEffect(() => {
    if (replay.length === lvl) {
      // We join our replay and the test sequence seperatly and check for equality. I chose join with a sperator rather than a simple toString, to avoid 1 and then 11 or 11 and then 1 from comparing to true.
      const isWin = replay.join("-") === sequence.join("-");

      // If we were wrong we lose a life
      if (!isWin) setLivesLeft((lvs) => lvs - 1);
      // If we were right, and our current evel is higher than our current score so far, we set a new score (the score in this gae is a bit more like a record more like a recored)
      if (isWin && lvl > score) setScore(lvl);

      setLvl(isWin ? lvl + 1 : lvl - 1);

      setIsAnswerCorrect(isWin);
      setIsCorrectIndicatorShowing(true);
      setTimeout(() => {
        setIsCorrectIndicatorShowing(false);
      }, 1500);
    }
  }, [replay, lvl, sequence, setLivesLeft]);

  // This resets our values to be ready for a new sequnce
  const reset = () => {
    setIsRunning(true);
    setSequene([]);
    setReplay([]);
    setFlashingBlock(null);
  };

  // Render our blocks. This gets called whenever a different block is flashing
  const renderBlocks = (flashing, isRunning) => {
    const blocks = [];
    for (let i = 0; i < 16; i++) {
      blocks.push(
        <Block
          isFlashing={i === flashing}
          isRunning={isRunning}
          registerClick={() => {
            setReplay((rply) => [...rply, i]);
            if (timeToAction > 3000) {
              setFouls((fouls) => [...fouls, timeToAction]);
            }
            setStartTime(Date.now());
            setTimeToAction(0);
          }}
        />
      );
    }
    return blocks;
  };

  return (
    <div className="corsi-block">
      {isLevelShowing ? (
        <div className="corsi-block__announcement corsi-block__announcement--level">
          {lvl} blocks
        </div>
      ) : null}

      {isCorrectIndicatorShowing ? (
        <div className="corsi-block__announcement corsi-block__announcement--answer">
          {isAnswerCorrect ? <CorrectIndicator /> : <WrongIndicator />}
        </div>
      ) : null}

      <div className="corsi-block__container">
        {renderBlocks(flashingBlock, isRunning)}
      </div>
    </div>
  );
};

export default CorsiBlock;
