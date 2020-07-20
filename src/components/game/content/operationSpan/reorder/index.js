import "./styles.scss";
import React, { useEffect, useContext, useState } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import strings from "../../../../../constants/localizedStrings";
import { GameInfoContext } from "../../../../../providers/GameInfo";
import { playWrong } from "../../../../../sounds/playFunctions";

import Image from "./image";
import InnerList from "./innerList";

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

  const [allImages, setAllImages] = useState([...assets]);

  const [firstRow, setFirstRow] = useState([]);
  const [secondRow, setSecondRow] = useState([]);

  useEffect(() => {
    setFirstRow([...userOrder.slice(0, 7)]);

    if (userOrder.length > 7) {
      setSecondRow([...userOrder.slice(7, 14)]);
    } else {
      setSecondRow([]);
    }
  }, [userOrder]);

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

  const compareOrders = () => {
    const reorderingIsSuccessful =
      userOrder.map((img) => img.id).join("-") ===
      providedOrder.map((img) => img.id).join("-");

    handleSubmit(reorderingIsSuccessful);
    setUserOrder([]);
  };

  const renderImages = (allImages) => {
    return allImages.map((img) => {
      return (
        <Image
          image={img}
          handleClick={() => handleImageClick(img)}
          isFull={userOrder.length === level}
          key={img.id}
        />
      );
    });
  };

  const handleImageClick = (img) => {
    setAllImages((all) => all.filter((i) => i.id !== img.id));
    setUserOrder((uo) => [...uo, img]);
  };

  const renderOrderedImages = (imageArray) => {
    return (
      <InnerList images={imageArray} handleClick={handleOrderedImageClick} />
    );
  };

  const handleOrderedImageClick = (img) => {
    setUserOrder((all) => all.filter((i) => i.id !== img.id));
    setAllImages((uo) => [...uo, img]);
  };

  // This method handles what happens when a dragging of an product is over.
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there was no final desination nothing happened - return
    if (!destination) {
      return;
    }

    // if the product started and finished in the same column and same index nothing happened - return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let newFirstRow = [...firstRow];
    let newSecondRow = [...secondRow];

    // If we moved items from within the same row, then this is where we handle them
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "ordered-assets-1") {
        newFirstRow.splice(source.index, 1);

        newFirstRow.splice(
          destination.index,
          0,
          assets.filter((img) => img.id === draggableId)[0]
        );
        setUserOrder([...newFirstRow, ...newSecondRow]);
      } else {
        newSecondRow.splice(source.index, 1);

        newSecondRow.splice(
          destination.index,
          0,
          assets.filter((img) => img.id === draggableId)[0]
        );
        setUserOrder([...newFirstRow, ...newSecondRow]);
      }
    }

    // Otherwise, if the items moved between different rows, we handle them here
    else {
      // If we moved an item from row 1 to row 2
      if (source.droppableId === "ordered-assets-1") {
        newFirstRow.splice(source.index, 1);
        newFirstRow.push(newSecondRow[0]);

        newSecondRow.splice(
          destination.index,
          0,
          assets.filter((img) => img.id === draggableId)[0]
        );

        newSecondRow.splice(0, 1);

        setUserOrder([...newFirstRow, ...newSecondRow]);
      }
      // Otherwise if we moved an item from row 2 to row 1
      else {
        newSecondRow.splice(source.index, 1);
        newSecondRow = [newFirstRow[newFirstRow.length - 1], ...newSecondRow];

        newFirstRow.splice(
          destination.index,
          0,
          assets.filter((img) => img.id === draggableId)[0]
        );
        newFirstRow.pop();

        setUserOrder([...newFirstRow, ...newSecondRow]);
      }
    }
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

        <DragDropContext onDragEnd={onDragEnd}>
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
              ? compareOrders()
              : console.log("Premature click");
          }}
        >
          {strings.submit}
        </div>
      </div>
    </div>
  );
};

export default Reorder;
