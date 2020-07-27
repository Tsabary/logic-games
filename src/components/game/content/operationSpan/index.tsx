import "./styles.scss";
import React, { useState, useEffect, useContext } from "react";

import { GameInfoContext } from "../../../../providers/GameInfo";
import Reorder from "./reorder";
import NewLevelIndicator from "./newLevelIndicator";
import ImageSlide from "./imageSlide";
import DistractionChallenge from "./distractionChallenge";

// These are functions that are unique to this game
import {
  // loselife,
  newLevel,
  makeReorderVisible,
  handleSubmit,
  handleAnswer,
  Asset,
  nextSet,
} from "./utils/functions";

// These are functions that are shared accross the different games
import { dropLevel } from "../../utils/functions";

import iconAssets from "./assets/hieroglyphs";

export default () => {
  const {
    livesLeft,
    setLivesLeft,
    score,
    setScore,
    fails,
    setFails,
  } = useContext(GameInfoContext);

  // This is our current level. This determines how many sets of image & distraction Q the user gets to see.
  const [level, setLevel] = useState<number>(2);

  // This holds all of the images that were presented to the user, in the order which they were presented.
  const [providedOrder, setProvidedOrder] = useState<Asset[]>([]);

  // This keeps track on the order the user reorders the images
  const [userOrder, setUserOrder] = useState<number[]>([]);

  // We use this to determine whether the user played or not. This helps us in our use effect to prevent from rendering the reorder component on level 1 befre the user has even played
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

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

  // This keeps track on whether the user's round was succesful or not, s we know what indicator to show them. 0 = first round, show nothing, 1 = succefful round, 2 = failed round
  const [isRoundSuccessful, setIsRoundSuccessful] = useState<number>(0);

  useEffect(() => {
    if (typeof setIsLevelIndicatorVisible === "object")
      console.log("setIsLevelIndicatorVisible is an object");
    if (typeof setIsReorderingVisible === "object")
      console.log("setIsReorderingVisible is an object");
    if (typeof setIsImageVisible === "object")
      console.log("setIsImageVisible is an object");
    if (typeof setIsDistractionQuestionVisible === "object")
      console.log("setIsDistractionQuestionVisible is an object");
    if (typeof setProvidedOrder === "object")
      console.log("setProvidedOrder is an object");
    if (typeof iconAssets === "object") console.log("iconAssets is an object");
    if (typeof providedOrder === "object")
      console.log("providedOrder is an object");

    newLevel(
      setIsLevelIndicatorVisible,
      setIsReorderingVisible,
      setIsImageVisible,
      setIsDistractionQuestionVisible,
      () => {
        nextSet(
          setIsLevelIndicatorVisible,
          setIsReorderingVisible,
          setIsImageVisible,
          setIsDistractionQuestionVisible,
          iconAssets,
          providedOrder,
          setProvidedOrder
        );
      }
    );
  }, [
    setIsLevelIndicatorVisible,
    setIsReorderingVisible,
    setIsImageVisible,
    setIsDistractionQuestionVisible,
    setProvidedOrder,
    providedOrder,
  ]);

  // If the amount of providedOrder is equal to our level, and our equation is null (which we do only after the user has answered the last distraction question) then it's time to allow them to order the images by sequence
  useEffect(() => {
    // Time to test the user on memorizing the images sequence.
    const userSawAllImagesForLevel = providedOrder.length === level;
    const userAnsweredAllQuestions = userAnswers.length === level;

    switch (true) {
      // If the user failed twice or more (more is jusr being safe, shouldn't eve be more than 2), they lose a life
      case fails >= 2:
        loselife(
          setIsRoundSuccessful,
          setLevel,
          setLivesLeft,
          setFails,
          setUserAnswers,
          setProvidedOrder,
          setUserOrder
        );
        newLevel(
          setIsLevelIndicatorVisible,
          setIsReorderingVisible,
          setIsImageVisible,
          setIsDistractionQuestionVisible,
          () => {
            nextSet(
              setIsLevelIndicatorVisible,
              setIsReorderingVisible,
              setIsImageVisible,
              setIsDistractionQuestionVisible,
              iconAssets,
              providedOrder,
              setProvidedOrder
            );
          }
        );
        break;

      // If the user saw all the images and there isn't a challenge set
      case userSawAllImagesForLevel && userAnsweredAllQuestions:
        makeReorderVisible(
          setIsLevelIndicatorVisible,
          setIsReorderingVisible,
          setIsImageVisible,
          setIsDistractionQuestionVisible
        );
        break;

      default:
        break;
    }
  }, [providedOrder, level, fails, userAnswers, setFails, setLivesLeft]);

  const renderContent = (
    isReorderingVisible: boolean,
    isImageVisible: boolean,
    isDistractionQuestionVisible: boolean,
    isLevelIndicatorVisible: boolean,
    level: number,
    providedOrder: Asset[]
  ) => {
    switch (true) {
      case isLevelIndicatorVisible &&
        !isImageVisible &&
        !isDistractionQuestionVisible &&
        !isReorderingVisible:
        return (
          <NewLevelIndicator level={level} isSuccessful={isRoundSuccessful} />
        );

      case isImageVisible &&
        providedOrder.length &&
        !isDistractionQuestionVisible &&
        !isLevelIndicatorVisible &&
        !isReorderingVisible:
        return (
          <ImageSlide img={providedOrder[providedOrder.length - 1].icon} />
        );

      case isDistractionQuestionVisible &&
        !isImageVisible &&
        !isLevelIndicatorVisible &&
        !isReorderingVisible:
        return (
          <DistractionChallenge
            handleAnswer={(isCorrect: boolean) =>
              handleAnswer(
                setUserAnswers,
                setFails,
                setIsLevelIndicatorVisible,
                setIsReorderingVisible,
                setIsImageVisible,
                setIsDistractionQuestionVisible,
                setProvidedOrder,
                iconAssets,
                isCorrect,
                fails,
                providedOrder,
                level
              )
            }
          />
        );

      case isReorderingVisible &&
        !isImageVisible &&
        !isDistractionQuestionVisible &&
        !isLevelIndicatorVisible:
        return (
          <Reorder
            assets={iconAssets}
            level={level}
            handleSubmit={(isEqual: boolean) =>
              handleSubmit(
                isEqual,
                setIsRoundSuccessful,
                setLevel,
                setScore,
                setFails,
                setUserAnswers,
                setProvidedOrder,
                setUserOrder,
                setLivesLeft,
                setIsLevelIndicatorVisible,
                setIsReorderingVisible,
                setIsImageVisible,
                setIsDistractionQuestionVisible,
                () => {
                  nextSet(
                    setIsLevelIndicatorVisible,
                    setIsReorderingVisible,
                    setIsImageVisible,
                    setIsDistractionQuestionVisible,
                    iconAssets,
                    providedOrder,
                    setProvidedOrder
                  );
                },
                level,
                score,
                livesLeft
              )
            }
            providedOrder={providedOrder}
            userOrder={userOrder}
            setUserOrder={setUserOrder}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="operation-span">
      {renderContent(
        isReorderingVisible,
        isImageVisible,
        isDistractionQuestionVisible,
        isLevelIndicatorVisible,
        level,
        providedOrder
      )}
    </div>
  );
};
