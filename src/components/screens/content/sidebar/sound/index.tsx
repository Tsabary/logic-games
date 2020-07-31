import "./styles.scss";
import React, { useContext } from "react";
import { gameInfoContext } from "../../../../../providers/GameInfo";

import {ReactComponent as SoundOn} from '../../../../assets/general/speaker_active.svg'
import {ReactComponent as SoundOff} from '../../../../assets/general/speaker_unactive.svg'

const Sound = () => {
  const { isSoundOn, setIsSoundOn } = useContext(gameInfoContext);

  return (
    <div className="sound">
      <input
        className="sound__checkbox"
        type="checkbox"
        checked={isSoundOn}
        readOnly
      />
      <div className="sound__button-container sound__button-container--active" onClick={() => setIsSoundOn(false)}>
      <SoundOn className="sound__button--active"/>
      </div>
      <div className="sound__button-container sound__button-container--unactive" onClick={() => setIsSoundOn(true)}>
      <SoundOff className="sound__button--unactive"/>

      </div>
    </div>
  );
};

export default Sound;
