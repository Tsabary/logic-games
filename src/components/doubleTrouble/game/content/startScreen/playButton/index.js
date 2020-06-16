import "./styles.scss";
import React from "react";
import { ReactSVG } from "react-svg";
import strings from "../../../../../../constants/localizedStrings";

const PlayButton = ({ setLaunch }) => {
  return (
    <div className="play-button">
      <div
        className="play-button__button-container"
        onClick={() => setLaunch(true)}
      >
        <ReactSVG
          src={"../assets/play.svg"}
          wrapper="div"
          beforeInjection={(svg) => {
            svg.classList.add("play-button__button-svg");
          }}
        />
      </div>
      <div className="play-button__text">{strings.StartGame}</div>
    </div>
  );
};

export default PlayButton;
