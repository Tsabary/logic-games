import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";

import strings from "../../../../../constants/localizedStrings";
import { gameInfoContext } from "../../../../../providers/GameInfo";

import HeartFull from "./heartActive";
import HeartLost from "./heartLost";
import HeartHalf from "./heartHalf";

const Lives = () => {
  const { fails, fouls } = useContext(gameInfoContext);

  const [lives, setLives] = useState<JSX.Element[]>();

  useEffect(() => {
    const liveComponents: JSX.Element[] = [];
    for (let i = 1; i < 4; i++) {
      // The order here is crucial
      switch (true) {
        case 3 - fails === i && fouls === 1:
          liveComponents.push(<HeartHalf key={i} />);
          break;

        case 4 - fails > i:
          liveComponents.push(<HeartFull key={i} />);
          break;

        case 4 - fails < i:
        default:
          liveComponents.push(<HeartLost key={i} />);
      }
    }

    setLives(liveComponents);
  }, [fails, fouls]);

  return (
    <div className="lives">
      <div className="lives__icons">{lives}</div>
      <div className="lives__title">{strings.livesRemaining}</div>
    </div>
  );
};

export default Lives;
