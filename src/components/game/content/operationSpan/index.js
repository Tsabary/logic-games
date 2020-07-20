import "./styles.scss";
import React, { useState, useEffect, useContext } from "react";

import iconAssets from "./assets/hieroglyphs";

import { GameInfoContext } from "../../../../providers/GameInfo";
import Reorder from "./reorder";
import NewLevelIndicator from "./newLevelIndicator";
import ImageSlide from "./imageSlide";
import DistractionChallenge from "./distractionChallenge";
import { addImageToSequence } from "./utils/functions";

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
  const [level, setLevel] = useState(2);

  // This holds all of the images that were presented to the user, in the order which they were presented.
  const [providedOrder, setProvidedOrder] = useState([]);

  // This keeps track on the order the user reorders the images
  const [userOrder, setUserOrder] = useState([]);

  // We use this to determine whether the user played or not. This helps us in our use effect to prevent from rendering the reorder component on level 1 befre the user has even played
  const [userAnswers, setUserAnswers] = useState([]);

  // We lay the image component on top of the equation component, and just present it for a short amount of time before having it disappear and presenting the user with the distraction Q. This state controlls whether the image component is currently visible or not.
  const [isImageVisible, setIsImageVisible] = useState(true);

  // This state controlls whether the distraction question component is currently visible or not.
  const [
    isDistractionQuestionVisible,
    setIsDistractionQuestionVisible,
  ] = useState(false);

  // This state indicates whether we should be presenting the user with the reordering ccomponent
  const [isReorderingVisible, setIsReorderingVisible] = useState(false);

  // When there's a level change, either when we pass or fail, we need to indicate that to the user. This state controls whether that compnent is visible or not
  const [isLevelIndicatorVisible, setIsLevelIndicatorVisible] = useState(false);

  // This keeps track on whether the user's round was succesful or not, s we know what indicator to show them. 0 = first round, show nothing, 1 = succefful round, 2 = failed round
  const [isRoundSuccessful, setIsRoundSuccessful] = useState(0);

  useEffect(() => {
    newLevel();
  }, []);

  // If the amount of providedOrder is equal to our level, and our equation is null (which we do only after the user has answered the last distraction question) then it's time to allow them to order the images by sequence
  useEffect(() => {
    // Time to test the user on memorizing the images sequence.
    const userSawAllImagesForLevel = providedOrder.length === level;
    const userAnsweredAllQuestions = userAnswers.length === level;

    switch (true) {
      // If the user failed twice or more (more is jusr being safe, shouldn't eve be more than 2), they lose a life
      case fails >= 2:
        loselife();
        newLevel();
        break;

      // If the user saw all the images and there isn't a challenge set
      case userSawAllImagesForLevel && userAnsweredAllQuestions:
        makeReorderVisible();
        break;

      default:
        break;
    }
  }, [providedOrder, level, fails, userAnswers]);

  // This fills the conditions required so the level indicator component is visible
  const makeLevelIndicatorVisible = () => {
    // We set the level indicator component visibility to visible
    setIsLevelIndicatorVisible(true);

    // We make the other components visibility to false
    setIsReorderingVisible(false);
    setIsImageVisible(false);
    setIsDistractionQuestionVisible(false);
  };

  // This fills the conditions required so reorder component is visible
  const makeReorderVisible = () => {
    // We set the reorder component visibility to visible
    setIsReorderingVisible(true);

    // We make the other components visibility to false
    setIsLevelIndicatorVisible(false);
    setIsImageVisible(false);
    setIsDistractionQuestionVisible(false);
  };

  // This fills the conditions required so the image component is visible
  const makeImageVisible = () => {
    // We set the icon's visibility to visible
    setIsImageVisible(true);

    // Wee add one image to our image sequence array
    addImageToSequence(iconAssets, providedOrder, setProvidedOrder);

    // We make the other components visibility to false
    setIsDistractionQuestionVisible(false);
    setIsReorderingVisible(false);
    setIsLevelIndicatorVisible(false);
  };

  const makeDistractionQuestionVisible = () => {
    // We set the distraction question's component visibility to visible
    setIsDistractionQuestionVisible(true);

    setIsImageVisible(false);
    setIsReorderingVisible(false);
    setIsLevelIndicatorVisible(false);
  };

  // This functions lunches a sequence of actions to start a new level
  const newLevel = () => {
    makeLevelIndicatorVisible();

    setTimeout(() => {
      nextSet();
    }, [3000]); // should be 3000
  };

  // The test is comprised of sets of a visual asset (images), and a distraction question. This function initializes new values for both
  const nextSet = () => {
    makeImageVisible();

    // We set a timer to hide the icon after 1.5 seconds
    setTimeout(() => {
      makeDistractionQuestionVisible();
    }, [1500]);
  };

  const loselife = () => {
    resetSession();
    setIsRoundSuccessful(2);
    setLevel((level) => (level === 1 ? 1 : level - 1));
    setLivesLeft((lvs) => lvs - 1);
  };

  const jumpLevel = () => {
    resetSession();
    setIsRoundSuccessful(1);
    setLevel((lvl) => lvl + 1);
    if (level > score) setScore(level);
  };

  const resetSession = () => {
    setFails(0);
    setUserAnswers([]);
    setProvidedOrder([]);
    setUserOrder([]);
  };

  // This is where we handle whether the user succeeded in ordering the assets or no
  const handleSubmit = (isEqual) => {
    isEqual ? jumpLevel() : loselife();

    setProvidedOrder([]);
    resetSession();
    if (livesLeft) newLevel();
  };

  // This is where we respond to the answer for the distraction questions.
  const handleAnswer = (isCorrect) => {
    setUserAnswers((answers) => [...answers, isCorrect]);

    // If the user didn't answer correctly they get a fail
    if (!isCorrect) setFails(fails + 1);

    // If the user was correct, or if they at least have no fails yet then we call the next set. If they are not correct and they have fails alreay, then that mean that the fails count would hit 2 in a moment and the game will reset on a new level
    if ((isCorrect || fails === 0) && providedOrder.length !== level) {
      nextSet();
    }
  };

  const renderContent = (
    isReorderingVisible,
    isImageVisible,
    isDistractionQuestionVisible,
    isLevelIndicatorVisible,
    level,
    providedOrder
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
        return <DistractionChallenge handleAnswer={handleAnswer} />;

      case isReorderingVisible &&
        !isImageVisible &&
        !isDistractionQuestionVisible &&
        !isLevelIndicatorVisible:
        return (
          <Reorder
            assets={iconAssets}
            level={level}
            handleSubmit={(isEqual) => handleSubmit(isEqual)}
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
