import "./styles.scss";
import React, { useContext } from "react";

import { GameInfoContext } from "../../../providers/GameInfo";

import Timer from "./gameTimer";
import Score from "./score";
import Sound from "./sound";
import Lives from "./lives";
import ActionTimer from "./actionTimer";

const Sidebar = () => {
  const { challenge } = useContext(GameInfoContext);

  const renderSections = (sections) => {
    return sections.map((sec, i) => {
      return (
        <div className="sidebar__panel" key={i}>
          {sec}
        </div>
      );
    });
  };

  const renderSidebar = (chlng) => {
    console.log("renderinf side bar")
    switch (chlng) {
      case 0: // Double Trouble
      case 1: // Logical Reasoning
        return (
          <div className="sidebar sidebar--f-2">
            {renderSections([<Timer />, <Score />, <Sound />])}
          </div>
        );

      case 2: // Corbi Blocks
        return (
          <div className="sidebar sidebar--f-2">
            {renderSections([<Lives />, <Score />, <Sound />])}
          </div>
        );

      case 3: // Operation Span
        return (
          <div className="sidebar sidebar--f-3">
            {renderSections([
              <Lives />,
              <ActionTimer timePerAction={5} />,
              <Score />,
              <Sound />,
            ])}
          </div>
        );

      default:
        return null;
    }
  };

  return renderSidebar(challenge);
};

export default Sidebar;
