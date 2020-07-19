import "./styles.scss";
import React, { useEffect } from "react";

const ImageSlide = ({ img }) => {
  useEffect(() => {
    console.log("I WAS CALLEDDDDDDDDD FROM IMAGE", img);
  }, []);
  return <div className="image-slide">{img}</div>;
};

export default ImageSlide;
