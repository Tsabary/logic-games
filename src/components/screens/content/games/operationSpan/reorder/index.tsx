import "./styles.scss";
import React, { useEffect, useContext, useState } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import strings from "../../../../../../constants/localizedStrings";
import { gameInfoContext } from "../../../../../../providers/GameInfo";
import { startCounting, stopCounting } from "../../utils/functions";

import { ReorderProps } from "./utils/interfaces";

import Image from "./image";
import InnerList from "./innerList";
import { Asset } from "../utils/classes";
import {
  handleImageClick,
  handleOrderedImageClick,
  onDragEnd,
  compareOrders,
} from "./utils/functions";

const Reorder = ({
  assets,
  level,
  handleSubmit,
  providedOrder,
}: ReorderProps) => {
  // Our imports from the game context
  const {
    setIsActionTimerRunning,
    timePerAction,
    setTimePerAction,
    setActionStartTime,
  } = useContext(gameInfoContext);

  const [allImages, setAllImages] = useState([...assets]);

  // This keeps track of our first and second rows of guesses that were added by the user. We split the guesses into two rows because the drag drop functionality doesn't work in a grid. With this split we can create a second row when needed automaticaly. Items could be dragged and dropped between rows seamlesly.
  const [firstRow, setFirstRow] = useState<Asset[]>([]);
  const [secondRow, setSecondRow] = useState<Asset[]>([]);

  // This keeps track on the order the user reorders the images
  const [userOrder, setUserOrder] = useState<Asset[]>([]);

  // This is where we split the guesses into the two different rows , if needed.
  useEffect(() => {
    // First row get first 7 items
    setFirstRow([...userOrder.slice(0, 7)]);

    if (userOrder.length > 7) {
      // If there are more than 7 items, second row gets the rest (we use 14 assets, so a maximum of 7 items for this row as well)
      setSecondRow([...userOrder.slice(7, 14)]);
    } else {
      // If there are only 7 guesses or less, we need to make sure that the secnd row is empty. Otherwise, it might have left over items from when the user has added more than 7 guesses, but then deleted some.
      setSecondRow([]);
    }
  }, [userOrder]);

  // We set the time per action to 15. Setting the time per action is what gets the timer going (together with other variables that we don't control from here)
  useEffect(() => {
    // setTimePerAction(15);
  }, [setTimePerAction]);

  // This should only execute once on load and once on unload
  useEffect(() => {
    if (!timePerAction) return;

    startCounting(setActionStartTime,setTimePerAction, setIsActionTimerRunning, 15);
    return () => {
      stopCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning
      );
    };
  }, [
    timePerAction,
    setActionStartTime,
    setTimePerAction,
    setIsActionTimerRunning,
  ]);

  // THis should submit the user's results when the time is done even if they didn't click submit (maybe they got it right anyway). Before we've based this n the timer going, but we currenty don't have access to the time anymore, so if we want this to work then we'll need a way around this.

  // useEffect(() => {
  //   if (actionTimeLeft < 0) {
  //     if (userOrder.length === level) {
  //       compareOrders();
  //     } else {
  //       handleSubmit(false);
  //       if (isSoundOn) playWrong.play();
  //     }
  //   }
  // }, [actionTimeLeft]);

  // Render the unordered images (for the user to choose from)
  const renderImages = (allImages: Asset[]) => {
    return allImages.map((img: Asset) => {
      return (
        <Image
          image={img}
          handleClick={() => handleImageClick(img, setAllImages, setUserOrder)}
          isFull={userOrder.length === level}
          key={img.id}
        />
      );
    });
  };

  // Render the ordered images, those that the use has already chose. Using this InnerList component, these images are rendered into a drag and drop component
  const renderOrderedImages = (imageArray: Asset[]) => {
    return (
      <InnerList
        images={imageArray}
        handleClick={(image: Asset) =>
          handleOrderedImageClick(image, setAllImages, setUserOrder)
        }
      />
    );
  };

  return (
    <div className="reorder">
      <div className="reorder__container">
        <div className="reorder__title">
          {level > 1
            ? `${strings.selectThe} ${level} ${strings.images}`
            : `${strings.selectThe} ${level} ${strings.image}`}
        </div>
        <div className="reorder__images reorder__images--all">
          {renderImages(allImages)}
        </div>

        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, firstRow, secondRow, assets, setUserOrder)
          }
        >
          <Droppable
            droppableId="ordered-assets-1"
            type="ordered-assets"
            direction="horizontal"
          >
            {(provided) => (
              <div
                className="reorder__images reorder__images--ordered"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {renderOrderedImages(firstRow)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {secondRow.length ? (
            <Droppable
              droppableId="ordered-assets-2"
              type="ordered-assets"
              direction="horizontal"
            >
              {(provided) => (
                <div
                  className="reorder__images reorder__images--ordered"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {renderOrderedImages(secondRow)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ) : null}
        </DragDropContext>

        <div
          className="button button--purple"
          style={{
            opacity: userOrder.length === level ? "1" : "0",
            transition: "all .2s",
          }}
          onClick={() => {
            userOrder.length === level
              ? compareOrders(
                  userOrder,
                  providedOrder,
                  handleSubmit,
                  setUserOrder
                )
              : console.log("Accidental click, button is invisible");
          }}
        >
          {strings.submit}
        </div>
      </div>
    </div>
  );
};

export default Reorder;
