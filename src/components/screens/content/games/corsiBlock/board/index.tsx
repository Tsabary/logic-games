import "./styles.scss";
import React, { useState, useEffect, useContext } from "react";

import { gameInfoContext } from "../../../../../../providers/GameInfo";

import { dropLevel, jumpLevel } from "../../utils/functions";
import { flash, runSequence } from "./utils/functions";

import Block from "./block";
import { handleSubmit } from "./utils/functions";
import { Functions } from "../../../utils/interfaces";

interface BoardProps {
  makeSuccessIndicatorVisible: () => void;
}

export default ({ makeSuccessIndicatorVisible }: BoardProps) => {
  const {
    setActionStartTime,
    setIsActionTimerRunning,
    setIsLevelSuccessful,
    level,
    setLevel,
  } = useContext(gameInfoContext);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [functions, setFunctions] = useState<Functions>();

  const [blocks, setBlocks] = useState<JSX.Element[]>([]);
  const [flashingBlock, setFlashingBlock] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const [sequence, setSequene] = useState<number[]>([]);
  const [replay, setReplay] = useState<number[]>([]);

  useEffect(() => {
    // Are we having a timer for Corsi? Currently having this function do nothing, otherwise we need to configure it
    const startCountingFn = () => {
      return;
    };
    // startCounting(setActionStartTime, setIsActionTimerRunning);

    const registerClickFn = (i: number) => {
      setReplay((replay: number[]) => [...replay, i]);
      startCountingFn();
    };

    const flashFn = () => {
      flash(setFlashingBlock, setSequene);
    };

    const runSequenceFn = () =>
      runSequence(level, setIsRunning, startCountingFn, flashFn);

    const dropLevelFn = () => dropLevel(setIsLevelSuccessful,level, setLevel);

    const jumpLevelFn = () => jumpLevel(setIsLevelSuccessful, setLevel);

    const handleSubmitFn = () => {
      handleSubmit(
        replay,
        sequence,
        jumpLevelFn,
        dropLevelFn,
        makeSuccessIndicatorVisible
      );
    };

    setFunctions({
      startCounting: startCountingFn,
      registerClick: registerClickFn,
      flash: flashFn,
      runSequence: runSequenceFn,
      dropLevel: dropLevelFn,
      jumpLevel: jumpLevelFn,
      handleSubmit: handleSubmitFn,
    });
  }, [
    setActionStartTime,
    setIsActionTimerRunning,
    replay,
    sequence,
    level,
    setLevel,
    setIsLevelSuccessful,
    makeSuccessIndicatorVisible,
  ]);

  // Load the first challenge on first render
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);
    functions.runSequence();
  }, [functions, isFirstLoad]);

  // This hook listens to hour replay and checks if we got it correctly. When the number of replays matches our level than it means that our replay is done.
  useEffect(() => {
    if (!functions || !sequence.length || !replay.length) return;

    functions.handleSubmit();
  }, [replay, sequence, functions]);

  // Render our blocks. This gets called whenever a different block is flashing
  useEffect(() => {
    if (!functions) return;

    const blocks = [];
    for (let i = 0; i < 16; i++) {
      blocks.push(
        <Block
          isFlashing={i === flashingBlock}
          isRunning={isRunning}
          registerClick={() => functions.registerClick(i)}
          key={i}
        />
      );
    }
    setBlocks(blocks);
  }, [flashingBlock, isRunning, functions]);

  return functions ? <div className="cb-board">{blocks}</div> : null;
};
