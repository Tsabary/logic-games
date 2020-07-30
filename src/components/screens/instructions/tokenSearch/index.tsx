import "./styles.scss";
import React, { useContext } from "react";

import strings from "../../../../constants/localizedStrings";
import { gameInfoContext } from "../../../../providers/GameInfo";

const TokenSearchInstructions = () => {
  const { setIsInstructionsVisible } = useContext(gameInfoContext);

  const renderIndicatorExplain = (title: string, details: string) => {
    return (
      <div className="ts-inst__indicator-explain-container">
        <div className="ts-inst__indicator-explain-title">{title}</div>
        <div className="ts-inst__indicator-explain-details">{details}</div>
      </div>
    );
  };

  const getIndicatorExplain = (i: number) => {
    switch (i) {
      case 0:
        return renderIndicatorExplain(
          strings.tsIndicatorExplainTitleOne,
          strings.tsIndicatorExplainDetailsOne
        );

      case 1:
        return renderIndicatorExplain(
          strings.tsIndicatorExplainTitleTwo,
          strings.tsIndicatorExplainDetailsTwo
        );

      case 2:
        return renderIndicatorExplain(
          strings.tsIndicatorExplainTitleThree,
          strings.tsIndicatorExplainDetailsThree
        );

      case 3:
        return renderIndicatorExplain(
          strings.tsIndicatorExplainTitleFour,
          strings.tsIndicatorExplainDetailsFour
        );

      case 4:
        return renderIndicatorExplain(
          strings.tsIndicatorExplainTitleFive,
          strings.tsIndicatorExplainDetailsFive
        );
    }
  };

  const renderIndicators = (names: string[]) => {
    return names.map((name, i) => (
      <div className="ts-inst__indicator-container" key={i}>
        <div className={`ts-inst__indicator ts-inst__indicator--${name}`} />

        {getIndicatorExplain(i)}
      </div>
    ));
  };

  return (
    <div className="ts-inst">
      <h1>{strings.instructionsTitle}</h1>
      <h2>
        {strings.tsInstructionsLineOne}
        <br />
        {strings.tsInstructionsLineTwo}
        <br />
        {strings.tsInstructionsLineThree}
        <br />
        {strings.tsInstructionsLineFour}
        <br />
        {strings.tsInstructionsLineFive}
      </h2>

      <div className="ts-inst__indicators">
        {renderIndicators([
          "default",
          "empty",
          "reopened",
          "token",
          "reopened-token",
        ])}
      </div>

      <div
        className="button button--green"
        onClick={() => setIsInstructionsVisible(false)}
      >
        {strings.iUnderstand}
      </div>
    </div>
  );
};

export default TokenSearchInstructions;
