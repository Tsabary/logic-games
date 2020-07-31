import "./styles.scss";
import React, { useEffect, useState, useContext } from "react";
import { Functions } from "../../../../../utils/interfaces";
import { operationSpanContext } from "../../../../../../../../providers/OperationSpan";
import icons from "../../assets/hieroglyphs";

import { getNewImage } from "./utils/functions";
import { Asset } from "../../../utils/classes";

export interface ImageSlideProps {
  makeDistractionChallengeVisible: () => void;
}

const ImageSlide = ({ makeDistractionChallengeVisible }: ImageSlideProps) => {
  const { providedOrder, setProvidedOrder } = useContext(operationSpanContext);

  const [functions, setFunctions] = useState<Functions>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [image, setImage] = useState<JSX.Element>();

  let visibilityTimeout: NodeJS.Timeout;

  visibilityTimeout = setTimeout(() => {
    makeDistractionChallengeVisible();
  }, 1500);

  useEffect(() => {
    return () => {
      if (visibilityTimeout) clearTimeout(visibilityTimeout);
    };
  }, [visibilityTimeout]);

  useEffect(() => {
    const addImageToSequenceFn = () => {
      const newImage = getNewImage(icons, providedOrder);
      setImage(newImage.icon);
      setProvidedOrder((updatedProvidedOrder: Asset[]) => [
        ...updatedProvidedOrder,
        newImage,
      ]);
    };

    setFunctions({
      addImageToSequence: addImageToSequenceFn,
    });
  }, [providedOrder, setProvidedOrder]);

  // When we first load we need to make the image visible
  useEffect(() => {
    if (!functions || !isFirstLoad) return;
    setIsFirstLoad(false);

    functions.addImageToSequence();
  }, [functions, isFirstLoad]);

  return <div className="image-slide">{image}</div>;
};

export default ImageSlide;
