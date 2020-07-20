import "./styles.scss";
import React from "react";

import { Draggable } from "react-beautiful-dnd";

export default ({ image, index, handleClick }) => {
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
