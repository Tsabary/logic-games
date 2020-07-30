import "./styles.scss";
import React from "react";

import { Draggable } from "react-beautiful-dnd";

import { OrderedImageProps } from "./interfaces";

export default ({ image, index, handleClick }: OrderedImageProps) => {
  return (
    <Draggable draggableId={image.id} index={index}>
      {(provided) => (
        <div
          className="ordered-image"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {image.icon}
          <div
            className="ordered-image__position"
            onClick={() => handleClick(image)}
          />
        </div>
      )}
    </Draggable>
  );
};
