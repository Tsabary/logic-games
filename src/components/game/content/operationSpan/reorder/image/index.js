import "./styles.scss";
import React from "react";

export default ({ image, isFull, handleClick }) => {
  return (
    <div className="image" onClick={() => (!isFull ? handleClick() : null)}>
      {image.icon}
    </div>
  );
};

// {userOrder.includes(img.index) ? (
//     <div className="reorder__image-position">
//       {userOrder.indexOf(img.index) + 1}
//     </div>
//   ) : null}
