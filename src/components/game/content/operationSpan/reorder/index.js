import "./styles.scss";
import React, { useEffect, useRef, useState, useContext } from "react";
import strings from "../../../../../constants/localizedStrings";
import { GameInfoContext } from "../../../../../providers/GameInfo";
import { playWrong } from "../../../../../sounds/playFunctions";

const Reorder = ({
  assets,
  level,
  handleSubmit,
  providedOrder,
  userOrder,
  setUserOrder,
}) => {
  const {
    setIsActionTimerRunning,
    timePerAction,
    setTimePerAction,
    setActionStartTime,
    actionTimeLeft,
    setActionTimeLeft,
  } = useContext(GameInfoContext);

  useEffect(() => {
    setTimePerAction(15);
    setActionTimeLeft(15);
  }, []);

  // This should only execute once on load and once on unload. When we
  useEffect(() => {
    if (!timePerAction) return;

    startCounting();
    return () => {
      stopCounting();
    };
  }, [timePerAction]);

  useEffect(() => {
    if (actionTimeLeft < 0) {
      handleSubmit(false);
      setUserOrder([]);
      playWrong.play();
    }
  }, [actionTimeLeft]);

  // When we want to start counting we set these values. These all affect what happens in the action timer in the sidebar
  const startCounting = () => {
    console.log("Should start counting from reorder");

    // We set a new start time to check how long it takes the user to answer
    setActionStartTime(Date.now());

    // We set actionTimerRunning to true so it'll run the count interval inside the time counter.
    setIsActionTimerRunning(true);
  };

  // When we want to stop counting we set these values. These all affect what happens in the action timer in the sidebar
  const stopCounting = () => {
    // We reset the start time to default, as this will be reset to the current date when this component is rendered again (and we'll that info)
    setActionStartTime(0);

    // We reset the time per action to 0 so when we reload this component or other components that use the timer, they wont start counting until they set the time per action
    setTimePerAction(0);

    // We set actionTimerRunning to false so it won't run the count interval inside the time counter.
    setIsActionTimerRunning(false);
  };

  const handleClick = (i) => {
    // If he user has ordered as many items as the level thy've just completed then they shouldn't be allowd to add any more choices
    if (userOrder.length === level && !userOrder.includes(i)) return;

    if (userOrder.includes(i)) {
      // If the user has already marked this image, we need to remove it from the order
      setUserOrder((uo) => uo.filter((index) => index !== i));
    } else {
      // Add this image to the order
      setUserOrder((uo) => [...uo, i]);
    }
  };

  const compareOrders = () => {
    const reorderingIsSuccessful =
      userOrder.join("-") === providedOrder.map((img) => img.index).join("-");

    handleSubmit(reorderingIsSuccessful);
    setUserOrder([]);
  };

  const renderImages = (imgs, userOrder) => {
    return imgs.map((img) => {
      return (
        <div
          className="reorder__image"
          key={img.index}
          onClick={() => {
            handleClick(img.index);
          }}
        >
          {userOrder.includes(img.index) ? (
            <div className="reorder__image-position">
              {userOrder.indexOf(img.index) + 1}
            </div>
          ) : null}
          {img.icon}
        </div>
      );
    });
  };

  return (
    <div className="reorder">
      <div className="reorder__title">
        {level > 1
          ? `${strings.selectThe} ${level} ${strings.images}`
          : `${strings.selectThe} ${level} ${strings.image}`}
      </div>
      <div className="reorder__images">{renderImages(assets, userOrder)}</div>
      <div
        className="button button--purple"
        style={{
          visibility: userOrder.length === level ? "visible" : "hidden",
        }}
        onClick={() => {
          userOrder.length === level
            ? compareOrders()
            : console.log("Premature click");
        }}
      >
        {strings.submit}
      </div>
    </div>
  );
};

export default Reorder;
