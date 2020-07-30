import "./styles.scss";
import React from "react";
import { UnorderedImageProps } from "./interfaces";

export default ({ image, isFull, handleClick }: UnorderedImageProps) => {
  return (
    <div
      className="image"
      onClick={() => {
        if (!isFull) handleClick();
      }}
    >
      {image.icon}
    </div>
  );
};
