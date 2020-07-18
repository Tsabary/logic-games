import "./styles.scss";
import React, { useState, useEffect, useContext } from "react";

import iconAssets from "./assets/icons";
import equations from "./utils/equations";

import { GameInfoContext } from "../../../../providers/GameInfo";
import Reorder from "./reorder";
import NewLevelIndicator from "./newLevelIndicator";
import ImageSlide from "./imageSlide";
import DistractionChallenge from "./distractionChallenge";

export default () => {
  const { setLivesLeft, score, setScore, fails, setFails } = useContext(
    GameInfoContext
  );

  // This is our current level. This determines how many sets of image & distraction Q the user gets to see.
  const [level, setLevel] = useState(4);

  // This holds our challenge/distraction Q
  const [challenge, setChallenge] = useState(null);

  // This holds all of the images that were presented to the user, in the order which they were presented.
  const [images, setImages] = useState([]);

  // We lay the image component on top of the equation component, and just present it for a short amount of time before having it disappear and presenting the user with the distraction Q. This state controlls whether the image component is currently visible or not.
  const [isImageVisible, setIsImageVisible] = useState(true);

  // This state indicates whether we should be presenting the user with the reordering ccomponent
  const [isReorderingVisible, setIsReorderingVisible] = useState(false);

  // When there's a level change, either when we pass or fail, we need to indicate that to the user. This state controls whether that compnent is visible or not
  const [isLevelIndicatorVisible, setIsLevelIndicatorVisible] = useState(false);

  // This keeps track on whether the user's round was succesful or not, s we know what indicator to show them. 0 = first round, show nothing, 1 = succefful round, 2 = failed round
  const [isRoundSuccessful, setIsRoundSuccessful] = useState(0);

  // This keeps travk on the order the user reorders the images
  const [userOrder, setUserOrder] = useState([]);

  // We use this to determine whether the user played or not. This helps us in our use effect to prevent from rendering the reorder component on level 1 befre the user has even played
  const [userPlayed, setUserPlayed] = useState(false);

  useEffect(() => {
    newLevel();
  }, []);

  // If the amount of images is equal to our level, and our equation is null (which we do only after the user has answered the last distraction question) then it's time to allow them to order the images by sequence
  useEffect(() => {
    // Time to test the user on memorizing the images sequence.
    const userSawAllImagesForLevel = images.length === level;
    const userIsNotFacingAChallengeRightNow = !challenge;

    switch (true) {
      // If the user failed twice or more (more is jusr being safe, shouldn't eve be more than 2), they lose a life
      case fails >= 2:
        setIsRoundSuccessful(2);
        loselife();
        setChallenge(null);
        break;

      // If the user saw all the images and there isn't a challenge set
      case userSawAllImagesForLevel &&
        userIsNotFacingAChallengeRightNow &&
        userPlayed:
        console.log("RENDER CASE  - userSawAllImagesForLevel");

        enterReorderMode();
        break;

      default:
        console.log("useeffectseults", userSawAllImagesForLevel);
        console.log("useeffectseults", userIsNotFacingAChallengeRightNow);
        console.log("useeffectseults", userPlayed);
        break;
    }
  }, [images, challenge, level, fails, userPlayed]);

  // This functions lumches a sequence of actions to start a new level
  const newLevel = () => {
    // Show the component that tells the user what level they're on now
    setIsLevelIndicatorVisible(true);
    setIsReorderingVisible(false);
    setIsImageVisible(false);

    setTimeout(() => {
      setChallenge(null);
      setImages([]);
      setFails(0);

      setIsLevelIndicatorVisible(false);
      setIsImageVisible(true);
      nextSet();
    }, [4000]);
  };

  const addImageToSequence = () => {
    // To prevent repeating the same image twice, we need to see which images have already been presented to the user. This variable holds he index of all the indexes of images that havent been presented to the user yet.
    // We create a map of all asset indexes, and then filter by checking for every index if it exists in the images array or not.
    const remainingIconsIndexes = iconAssets
      .map((ic) => ic.index)
      .filter((ic) => !images.map((i) => i.index).includes(ic));

    // Then, using our list of remaining indexes, we extract a random item/index from that list
    const newIconIndex =
      remainingIconsIndexes[
        Math.floor(Math.random() * remainingIconsIndexes.length)
      ];

    // Then, we add another icon to our sequence by filtering ou icon assets array to match the new randm index we've just created
    setImages((ics) => [
      ...ics,
      iconAssets.filter((ic) => ic.index === newIconIndex)[0],
    ]);
  };

  // The test is comprised of sets of a visual asset (images), and a distraction question. This function initializes new values for both
  const nextSet = () => {
    // Wee add one image to our image sequence array
    addImageToSequence();

    // We set a new distraction question
    setChallenge(equations[Math.floor(Math.random() * equations.length)]);

    // We set the icon's visibility to visible
    setIsImageVisible(true);

    // We set a timer to hide the icon after 1.5 seconds
    setTimeout(() => {
      setIsImageVisible(false);
    }, [1500]);
  };

  const loselife = () => {
    // In case we got our second fail at the last question, we want to make sure reordering isn't kicking in
    setUserPlayed(false);
    setIsReorderingVisible(false);
    setLivesLeft((lvs) => lvs - 1);
    setLevel((level) => (level === 1 ? 1 : level - 1));
    setFails(0);
    setIsImageVisible(false);
    setChallenge(null);
    newLevel();
    setIsLevelIndicatorVisible(true);
  };

  const enterReorderMode = () => {
    setIsReorderingVisible(true);
    setFails(0);
    setChallenge(null);
    setIsImageVisible(false);
    setIsLevelIndicatorVisible(false);
    setUserPlayed(false);
  };

  // This is where we compare the two orders - the one we have generated for the user to repeat, and the one that they have submitted
  const compareOrders = (userOrder) => {
    const reorderingIsSuccessful =
      userOrder.join("-") === images.map((img) => img.index).join("-");

    setIsRoundSuccessful(reorderingIsSuccessful ? 1 : 2);

    if (reorderingIsSuccessful) {
      // If this is a new record, aise the users score.
      if (level > score) setScore(level);

      // Then we set the level one higher and initiate the new level sequence
      setLevel((lvl) => lvl + 1);
      newLevel();
      setUserPlayed(false);
    } else {
      // If it wasn't a good reordering then we set the fails to 2. This will set on the failing sequence
      loselife();
    }
  };

  // This is where we respond to the answer for the distraction questions.
  const handleAnswer = (isWin) => {
    setUserPlayed(true);

    // If the user didn't answer correctly they get a fail
    if (!isWin) setFails(fails + 1);

    // If the length of the images array isn't the same as the level, then we still have more sets to go through before repeating the order of the images. We also need to make sure that the user didn't fail twice, because if they did the whole game is about to reset. We do it by checking that either they have no fails so far, or if they do have fails (max 1, as by 2 everything resets) that this last answer was true. If the user has fails and they got this answer wrong then the game will shortly reset.

    const thisWasLastChallenge = images.length === level;
    const levelOne = level === 1;

    if (thisWasLastChallenge || levelOne) {
      setChallenge(null);
    } else {
      nextSet();
    }
  };

  // This funcion is called when we take too long to answer a question
  const handleOvertime = () => {
    setUserPlayed(true);

    setFails(fails + 1);

    const thisWasLastChallenge = images.length === level;
    const levelOne = level === 1;

    if (thisWasLastChallenge || levelOne) {
      setChallenge(null);
    } else {
      nextSet();
    }
  };

  const renderContent = (
    isReorderingVisible,
    level,
    isImageVisible,
    isLevelIndicatorVisible,
    images,
    challenge
  ) => {
    switch (true) {
      case isLevelIndicatorVisible &&
        !isImageVisible &&
        !isReorderingVisible &&
        !challenge:
        console.log("RENDER CASE  -  NEW LEVEL INDICATOR should showww");
        return (
          <NewLevelIndicator level={level} isSuccessful={isRoundSuccessful} />
        );

      case isImageVisible &&
        images.length &&
        !isLevelIndicatorVisible &&
        !isReorderingVisible:
        console.log("RENDER CASE  -  IMAGE");
        console.log("RENDER CASE  -  IMAGE", images);
        return <ImageSlide img={images[images.length - 1].icon} />;

      case challenge &&
        !isImageVisible &&
        !isLevelIndicatorVisible &&
        !isReorderingVisible:
        console.log("RENDER CASE  -  DISTRACTION CHALLENGE");
        return (
          <DistractionChallenge
            challenge={challenge}
            handleAnswer={handleAnswer}
            handleOvertime={handleOvertime}
          />
        );

      case isReorderingVisible &&
        !isImageVisible &&
        !isLevelIndicatorVisible &&
        !challenge:
        console.log("RENDER CASE  -  REORDER");
        return (
          <Reorder
            images={iconAssets}
            level={level}
            compareOrders={(userOrder) => compareOrders(userOrder)}
            userOrder={userOrder}
            setUserOrder={setUserOrder}
          />
        );

      default:
        // // Check why image isn't visible
        // console.log("RENDER CASE image -  NOTHING");
        // console.log("RENDER CASE image -  NOTHING", isImageVisible);
        // console.log("RENDER CASE image -  NOTHING", !!images.length);
        // console.log("RENDER CASE image -  NOTHING", !isLevelIndicatorVisible);
        // console.log("RENDER CASE image -  NOTHING", !isReorderingVisible);

        // Check why image isn't visible
        // console.log("RENDER CASE REORDER -  NOTHING");
        // console.log("RENDER CASE REORDER -  NOTHING", isReorderingVisible);
        // console.log("RENDER CASE REORDER -  NOTHING", !isImageVisible);
        // console.log("RENDER CASE REORDER -  NOTHING", !isLevelIndicatorVisible);
        // console.log("RENDER CASE REORDER -  NOTHING", !challenge);

        // Check why level indicator isn't visible
        console.log("RENDER CASE level indicator -  NOTHING");
        console.log(
          "RENDER CASE level indicator -  NOTHING",
          isLevelIndicatorVisible
        );
        console.log("RENDER CASE level indicator -  NOTHING", !isImageVisible);
        console.log(
          "RENDER CASE level indicator -  NOTHING",
          !isReorderingVisible
        );
        console.log("RENDER CASE level indicator -  NOTHING", !challenge);
        return null;
    }
  };

  return (
    <div className="operation-span">
      {renderContent(
        isReorderingVisible,
        level,
        isImageVisible,
        isLevelIndicatorVisible,
        images,
        challenge
      )}
    </div>
  );
};
