import "./styles.scss";
import React, { useState, useEffect, useContext } from "react";
import { Functions } from "../../../../utils/interfaces";
import ImageSlide from "./imageSlide";
import DistractionChallenge from "./distractionChallenge";
import {
  makeImageVisible,
  makeDistractionChallengeVisible,
} from "./utils/functions";
import { operationSpanContext } from "../../../../../../../providers/OperationSpan";

const ImageAndChallengeSet = () => {
  const { userAnswers, providedOrder } = useContext(operationSpanContext);

  const [functions, setFunctions] = useState<Functions>();

  const [visibleComponent, setVisibleComponent] = useState<JSX.Element>();

  // This state controlls whether the image component is currently visible or not.
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);

  // This state controlls whether the distraction challenge component is currently visible or not.
  const [
    isDistractionChallengeVisible,
    setIsDistractionChallengeVisible,
  ] = useState<boolean>(false);

  useEffect(() => {
    const makeImageVisibleFn = () => {
      makeImageVisible(setIsImageVisible, setIsDistractionChallengeVisible);
    };

    const makeDistractionChallengeVisibleFn = () => {
      makeDistractionChallengeVisible(
        setIsImageVisible,
        setIsDistractionChallengeVisible
      );
    };

    setFunctions({
      makeImageVisible: makeImageVisibleFn,
      makeDistractionChallengeVisible: makeDistractionChallengeVisibleFn,
    });
  }, [setIsImageVisible, setIsDistractionChallengeVisible]);

  useEffect(() => {
    if (!functions) return;

    switch (true) {
      case isImageVisible:
        setVisibleComponent(
          <ImageSlide
            makeDistractionChallengeVisible={
              functions.makeDistractionChallengeVisible
            }
          />
        );
        break;

      case isDistractionChallengeVisible:
        setVisibleComponent(<DistractionChallenge />);
        break;
    }
  }, [isImageVisible, isDistractionChallengeVisible, functions]);

  // When we first load we need to make the image visible
  useEffect(() => {
    if (!functions) return;

    if (userAnswers.length === providedOrder.length) {
      functions.makeImageVisible();
    }
  }, [functions, userAnswers, providedOrder]);

  return functions ? (
    <div className="image-and-challenge-set">{visibleComponent}</div>
  ) : null;
};

export default ImageAndChallengeSet;
