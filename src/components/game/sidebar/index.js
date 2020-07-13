import "./styles.scss";
import React, { useContext } from "react";

import { GameInfoContext } from "../../../providers/GameInfo";

import Timer from "./timer";
import Score from "./score";
import Sound from "./sound";
import Lives from "./lives";

const Sidebar = () => {
  const { challenge } = useContext(GameInfoContext);

  const renderTop = (chlng) => {
    switch (chlng) {
      case 2:
        return <Lives />;

      default:
        return <Timer />;
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__panel">{renderTop(challenge)}</div>

      <div className="sidebar__panel">
        <Score />
      </div>

      <div className="sidebar__panel">
        <Sound />
      </div>
    </div>
  );
};

export default Sidebar;
