import "./styles.scss";
import React, { useEffect, useContext, useState } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import strings from "../../../../../../../constants/localizedStrings";
import { gameInfoContext } from "../../../../../../../providers/GameInfo";
import {
  startCounting,
  stopCounting,
  dropLevel,
  jumpLevel,
} from "../../../utils/functions";

import assets from "../assets/hieroglyphs";

import Image from "./image";
import InnerList from "./innerList";
import { Asset } from "../../utils/classes";
import {
  handleImageClick,
  handleOrderedImageClick,
  onDragEnd,
  compareOrders,
  repopulateRows,
} from "./utils/functions";
import { Functions } from "../../../../utils/interfaces";
import { operationSpanContext } from "../../../../../../../providers/OperationSpan";

const Reorder = () => {
  // Our imports from the game context
  const {
    setIsActionTimerRunning,
    setTimePerAction,
    setActionStartTime,
    level,
    setLevel,
    setIsLevelSuccessful,
  } = useContext(gameInfoContext);

  const { providedOrder, setUserAnswers } = useContext(operationSpanContext);

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [allImages, setAllImages] = useState([...assets]);

  // This keeps track of our first and second rows of guesses that were added by the user. We split the guesses into two rows because the drag drop functionality doesn't work in a grid. With this split we can create a second row when needed automaticaly. Items could be dragged and dropped between rows seamlesly.
  const [firstRow, setFirstRow] = useState<Asset[]>([]);
  const [secondRow, setSecondRow] = useState<Asset[]>([]);

  // This keeps track on the order the user reorders the images
  const [userOrder, setUserOrder] = useState<Asset[]>([]);

  useEffect(() => {
    const startCountingFn = () => {
      startCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning,
        15
      );
    };

    const stopCountingFn = () => {
      stopCounting(
        setActionStartTime,
        setTimePerAction,
        setIsActionTimerRunning
      );
    };

    const jumpLevelFn = () => {
      jumpLevel(setIsLevelSuccessful, setLevel);
    };

    const dropLevelFn = () => {
      dropLevel(setIsLevelSuccessful, level, setLevel);
    };

    const repopulateRowsFn = () => {
      repopulateRows(setFirstRow, setSecondRow, userOrder);
    };

    const compareOrdersFn = () => {
      userOrder.length === level &&
        compareOrders(userOrder, providedOrder, jumpLevelFn, dropLevelFn);
    };

    setFunctions({
      jumpLevel: jumpLevelFn,
      dropLevel: dropLevelFn,
      startCounting: startCountingFn,
      stopCounting: stopCountingFn,
      repopulateRows: repopulateRowsFn,
      compareOrders: compareOrdersFn,
    });
  }, [
    setFirstRow,
    setSecondRow,
    userOrder,
    setActionStartTime,
    setTimePerAction,
    setIsActionTimerRunning,
    setIsLevelSuccessful,
    level,
    setLevel,
    providedOrder,
    setUserAnswers,
  ]);

  // This is where we split the guesses into the two different rows , if needed.
  useEffect(() => {
    if (!functions) return;

    functions.repopulateRows();
  }, [userOrder, functions]);

  // Load the first challenge on first render
  useEffect(() => {
    if (!functions || !isFirstLoad) return;

    setIsFirstLoad(false);

    functions.startCounting();
  }, [functions, isFirstLoad]);

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

  return functions ? (
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
          onClick={functions.compareOrders}
        >
          {strings.submit}
        </div>
      </div>
    </div>
  ) : null;
};

export default Reorder;
