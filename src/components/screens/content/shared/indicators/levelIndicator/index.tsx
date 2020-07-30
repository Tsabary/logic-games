import React, { useContext, useEffect } from "react";
import strings from "../../../../../../constants/localizedStrings";
import { gameInfoContext } from "../../../../../../providers/GameInfo";

interface LevelIndicatorProps {
  makeGameVisible: () => void;
}

export default ({ makeGameVisible }: LevelIndicatorProps) => {
  const { level } = useContext(gameInfoContext);
  let visibilityTimeout: NodeJS.Timeout;

  visibilityTimeout = setTimeout(() => {
    makeGameVisible();
  }, 1500);

  useEffect(() => {
    return () => {
      if (visibilityTimeout) clearTimeout(visibilityTimeout);
    };
  }, []);

  return (
    <div className="corsi-block__indicator">
      {level} {strings.blocks}
    </div>
  );
};
