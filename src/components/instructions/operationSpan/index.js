import "./styles.scss";
import React, { useContext } from "react";

import { GameInfoContext } from "../../../providers/GameInfo";

import strings from "../../../constants/localizedStrings";
import { Castle, Chimney, Hammer, Horse } from "./assets";

export default () => {
  const { setIsInstructionsVisible } = useContext(GameInfoContext);

  return (
    <div className="os-inst">
      <h1>{strings.instructionsTitle}</h1>
      <h2>
        {strings.osInstructionsLineOne}
        <br />
        {strings.osInstructionsLineTwo}
        <br />
        {strings.osInstructionsLineThree}
      </h2>

      <div className="os-inst__steps-container">
        <div className="os-inst__step-container">
          <div className="os-inst__step-title">{strings.image}</div>
          <Horse
            style={{ height: "80px", width: "80px", alignSelf: "center", fill:"#ffffff" }}
          />
          <div className="os-inst__step-info">{strings.imageInfo}</div>
        </div>

        <div className="os-inst__step-container">
          <div className="os-inst__step-title">{strings.mathEquation}</div>

          <div>
            <div className="os-inst__equation-statement">(4 * 5) - 3 = 17</div>
            <div className="os-inst__equation-actions">
              <div className="os-inst__equation-action os-inst__equation-action--false">
                {strings.false}
              </div>
              <div className="os-inst__equation-action os-inst__equation-action--true">
                {strings.true}
              </div>
            </div>
          </div>

          <div className="os-inst__step-info">
            {strings.mathEquationInfoOne} <br /> {strings.mathEquationInfoTwo}
          </div>
        </div>

        <div className="os-inst__step-container">
          <div className="os-inst__step-title">{strings.selectImages}</div>
          <div className="os-inst__select-icons">
            <div className="os-inst__select-icon">
              <Horse
                style={{ height: "6rem", width: "6rem", alignSelf: "center", fill:"#ffffff" }}
              />
              <div className="os-inst__select-number">1</div>
            </div>
            <div className="os-inst__select-icon">
              <Chimney
                style={{ height: "6rem", width: "6rem", alignSelf: "center", fill:"#ffffff" }}
              />
              <div className="os-inst__select-number">2</div>
            </div>
            <div className="os-inst__select-icon">
              <Castle
                style={{ height: "6rem", width: "6rem", alignSelf: "center", fill:"#ffffff" }}
              />
              <div className="os-inst__select-number">3</div>
            </div>
            <div className="os-inst__select-icon">
              <Hammer
                style={{ height: "6rem", width: "6rem", alignSelf: "center", fill:"#ffffff" }}
              />
              <div className="os-inst__select-number">4</div>
            </div>
          </div>
          <div className="os-inst__step-info">
            {strings.selectImagesInfoOne} <br /> {strings.selectImagesInfoTwo}
          </div>
        </div>
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
