import "./styles.scss";
import React, { useState, useEffect, useContext, useRef } from "react";

import { gameInfoContext } from "../../../../../providers/GameInfo";
import Reorder from "./reorder";
import NewLevelIndicator from "./newLevelIndicator";
import ImageSlide from "./imageSlide";
import DistractionChallenge from "./distractionChallenge";

import iconAssets from "./assets/hieroglyphs";


// These are functions that are shared accross the different games
import { dropLevel, jumpLevel } from "../utils/functions";

// These are functions that are unique to this game
import {
  newLevel,
  makeReorderVisible,
  handleSubmit,
  handleAnswer,
  Asset,
  makeImageVisible,
  makeDistractionQuestionVisible,
  makeLevelIndicatorVisible,
  addImageToSequence,
} from "./utils/functions";
import { Functions } from "../../utils/interfaces";

export default () => {
  const {
    score,
    setScore,
    fails,
    setFouls,
    level,
    setLevel,
    isDone,
    setIsLevelSuccessful,
  } = useContext(gameInfoContext);

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [visibleComponent, setVisibleComponent] = useState<JSX.Element>();

  // This holds all of the images that were presented to the user, in the order which they were presented.
  const [providedOrder, setProvidedOrder] = useState<Asset[]>([]);

  // We use this to determine whether the user played or not. This helps us in our use effect to prevent from rendering the reorder component on level 1 befre the user has even played
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  /**
   *  THESE STATES KEEP TRACK ON THE VISIBILITY OF THE DIFFERENT COMPNENTS
   */

  // We lay the image component on top of the equation component, and just present it for a short amount of time before having it disappear and presenting the user with the distraction Q. This state controlls whether the image component is currently visible or not.
  const [isImageVisible, setIsImageVisible] = useState<boolean>(true);

  // This state controlls whether the distraction question component is currently visible or not.
  const [
    isDistractionQuestionVisible,
    setIsDistractionQuestionVisible,
  ] = useState<boolean>(false);

  // This state indicates whether we should be presenting the user with the reordering ccomponent
  const [isReorderingVisible, setIsReorderingVisible] = useState<boolean>(
    false
  );

  // When there's a level change, either when we pass or fail, we need to indicate that to the user. This state controls whether that compnent is visible or not
  const [isLevelIndicatorVisible, setIsLevelIndicatorVisible] = useState<
    boolean
  >(false);

  const previousLevel = useRef<number>();

  // Set the functions object which holds all of our actions
  useEffect(() => {
    const addImageToSequenceFn = () =>
      addImageToSequence(iconAssets, providedOrder, setProvidedOrder);

    const makeLevelIndicatorVisibleFn = () => {
      makeLevelIndicatorVisible(
        setIsLevelIndicatorVisible,
        setIsReorderingVisible,
        setIsImageVisible,
        setIsDistractionQuestionVisible
      );
    };

    const makeImageVisibleFn = () => {
      makeImageVisible(
        setIsLevelIndicatorVisible,
        setIsReorderingVisible,
        setIsImageVisible,
        setIsDistractionQuestionVisible,
        addImageToSequenceFn
      );
    };

    const makeDistractionQuestionVisibleFn = () => {
      makeDistractionQuestionVisible(
        setIsLevelIndicatorVisible,
        setIsReorderingVisible,
        setIsImageVisible,
        setIsDistractionQuestionVisible
      );
    };

    const makeReorderVisibleFn = () => {
      makeReorderVisible(
        setIsLevelIndicatorVisible,
        setIsReorderingVisible,
        setIsImageVisible,
        setIsDistractionQuestionVisible
      );
    };

    const newLevelFn = () =>
      newLevel(setUserAnswers, setProvidedOrder, makeLevelIndicatorVisibleFn);

    const jumpLevelFn = () => jumpLevel(setIsLevelSuccessful, setLevel);

    const dropLevelFn = () => dropLevel(setIsLevelSuccessful, setLevel);

    const handleSubmitFn = (isCorrect: boolean) =>
      handleSubmit(
        isCorrect, // Did the user succeed?
        jumpLevelFn, // handleSuccess
        dropLevelFn, // handleFail
        newLevelFn, // newLevel
        !isDone // moreRounds - are there more rounds to be palyed?
      );

    const handleAnswerFn = (isCorrect: boolean) =>
      handleAnswer(
        setUserAnswers,
        setFouls,
        makeImageVisibleFn,
        isCorrect,
        fails,
        providedOrder,
        level
      );

    setFunctions({
      addImageToSequence: addImageToSequenceFn,
      makeLevelIndicatorVisible: makeLevelIndicatorVisibleFn,
      makeImageVisible: makeImageVisibleFn,
      makeDistractionQuestionVisible: makeDistractionQuestionVisibleFn,
      makeReorderVisible: makeReorderVisibleFn,
      newLevel: newLevelFn,
      jumpLevel: jumpLevelFn,
      dropLevel: dropLevelFn,
      handleSubmit: handleSubmitFn,
      handleAnswer: handleAnswerFn,
    });
  }, [
    providedOrder,
    setProvidedOrder,
    setIsLevelIndicatorVisible,
    setIsReorderingVisible,
    setIsImageVisible,
    setIsDistractionQuestionVisible,
    setIsLevelSuccessful,
    setLevel,
    setScore,
    level,
    score,
    setFouls,
    setUserAnswers,
    isDone,
    fails,
  ]);

  // Start a new level on first load automatically
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);
    setLevel(2);
  }, [functions, isFirstLoad, setLevel]);

  // Start a new level on first load automatically
  useEffect(() => {
    if (!functions || previousLevel.current === level) return;
    previousLevel.current = level;

    functions.newLevel();
  }, [functions, level]);

  // If the user has seen all the photos for the level and answered all the questions then they should see the reordering
  useEffect(() => {
    if (!functions) return;

    const userSawAllImagesForLevel = providedOrder.length === level;
    const userAnsweredAllQuestions = userAnswers.length === level;

    if (
      userSawAllImagesForLevel &&
      userAnsweredAllQuestions &&
      previousLevel.current === level
    ) {
      functions.makeReorderVisible();
    }
  }, [providedOrder, userAnswers, level, functions]);

  // useEffect(() => {
  //   console.log("providedOrder use effect", providedOrder)
  // }, [providedOrder]);

  useEffect(() => {
    if (!functions) return;

    switch (true) {
      case isLevelIndicatorVisible:
        setVisibleComponent(
          <NewLevelIndicator
            level={level}
            makeImageVisible={functions.makeImageVisible}
          />
        );
        break;

      case isImageVisible && providedOrder.length:
        setVisibleComponent(
          <ImageSlide
            img={providedOrder[providedOrder.length - 1].icon}
            makeDistractionQuestionVisible={
              functions.makeDistractionQuestionVisible
            }
          />
        );
        break;

      case isDistractionQuestionVisible:
        setVisibleComponent(
          <DistractionChallenge
            handleAnswer={(isCorrect: boolean) =>
              functions.handleAnswer(isCorrect)
            }
          />
        );
        break;

      case isReorderingVisible:
        setVisibleComponent(
          <Reorder
            assets={iconAssets}
            level={level}
            handleSubmit={(isCorrect: boolean) =>
              functions.handleSubmit(isCorrect)
            }
            providedOrder={providedOrder}
          />
        );
        break;

      default:
        setVisibleComponent(
          <div>
            I've got nothing to render
            <br />
            <br />
            <div>
              isLevelIndicatorVisible {isLevelIndicatorVisible.toString()}
            </div>
            <br />
            <div>isImageVisible {isImageVisible.toString()}</div>
            <div>providedOrder length {!!providedOrder.length.toString()}</div>
            <div>providedOrder length {providedOrder.length.toString()}</div>
            <br />
            <div>
              isDistractionQuestionVisible{" "}
              {isDistractionQuestionVisible.toString()}
            </div>
            <br />
            <div>isReorderingVisible {isReorderingVisible.toString()}</div>
            <br />
          </div>
        );
    }
  }, [
    functions,
    isReorderingVisible,
    isImageVisible,
    isDistractionQuestionVisible,
    isLevelIndicatorVisible,
    providedOrder,
    level,
  ]);

  return functions ? (
    <div className="operation-span">{visibleComponent}</div>
  ) : null;
};
