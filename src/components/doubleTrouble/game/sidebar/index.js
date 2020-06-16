import "./styles.scss";
import React from "react";
import Timer from "./timer";
import Score from "./score";
import Sound from "./sound";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <div className="sidebar__panel">
        <Timer />
      </div>

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
