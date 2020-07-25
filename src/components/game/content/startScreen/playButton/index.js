import "./styles.scss";
import React from "react";
import strings from "../../../../../constants/localizedStrings";
import { ReactComponent as Play } from "../../../../assets/general/play.svg";

const PlayButton = ({ setLaunch }) => {
  return (
    <div className="play-button">
      <div
        className="play-button__button-container"
        onClick={() => setLaunch(true)}
      >
        <Play className="play-button__button-svg" />
      </div>
      <div className="play-button__text">{strings.StartGame}</div>
    </div>
  );
};

export default PlayButton;
