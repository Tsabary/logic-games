import "./styles.scss";
import React, { useEffect } from "react";

export interface ImageSlideProps {
  img: JSX.Element;
  makeDistractionQuestionVisible: () => void;
}

const ImageSlide = ({
  img,
  makeDistractionQuestionVisible,
}: ImageSlideProps) => {
  let visibilityTimeout: NodeJS.Timeout;

  visibilityTimeout = setTimeout(() => {
    makeDistractionQuestionVisible();
  }, 1500);

  useEffect(() => {
    return () => {
      if (visibilityTimeout) clearTimeout(visibilityTimeout);
    };
  }, []);

  return <div className="image-slide">{img}</div>;
};

export default ImageSlide;
