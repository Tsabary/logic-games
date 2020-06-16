import "./styles.scss";
import React, { useContext } from "react";
import { ReactSVG } from "react-svg";
import { DoubleTroubleContext } from "../../../../../providers/DoubleTrouble";

const Sound = () => {
  const { isSoundOn, setIsSoundOn } = useContext(DoubleTroubleContext);

  return (
    <div className="sound">
      <input
        className="sound__checkbox"
        type="checkbox"
        checked={isSoundOn}
        readOnly
      />
      <div className="sound__button-container sound__button-container--active" onClick={()=> setIsSoundOn(false)}>
        <ReactSVG
          src={"../assets/speaker_active.svg"}
          wrapper="div"
          beforeInjection={(svg) => {
            svg.classList.add("sound__button--active");
          }}
        />
      </div>
      <div className="sound__button-container sound__button-container--unactive" onClick={()=> setIsSoundOn(true)}>
        <ReactSVG
          src={"../assets/speaker_unactive.svg"}
          wrapper="div"
          beforeInjection={(svg) => {
            svg.classList.add("sound__button--unactive");
          }}
        />
      </div>
    </div>
  );
};

export default Sound;
