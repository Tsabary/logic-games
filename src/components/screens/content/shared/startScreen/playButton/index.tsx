import "./styles.scss";
import React from "react";

import strings from "../../../../../../constants/localizedStrings";
import { ReactComponent as Play } from "../../../../../assets/general/play.svg";

interface PlayButtonProps {
  launch: () => void;
}

const PlayButton = ({ launch }: PlayButtonProps) => {
  return (
    <div className="play-button">
      <div className="play-button__button-container" onClick={launch}>
        <Play className="play-button__button-svg" />
      </div>
      <div className="play-button__text">{strings.startGame}</div>
    </div>
  );
};

export default PlayButton;
