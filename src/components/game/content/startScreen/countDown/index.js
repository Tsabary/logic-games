import "./styles.scss";
import React from "react";


const CountDown = ({ timeToStart }) => {
  return (
    <div className="count-down">
      {timeToStart > 1 ? (
        <div className="counter-sun counter-sun--count">
          <div className="count-down__count">{Math.floor(timeToStart)}</div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <div className="counter-sun counter-sun--go">
          <div className="count-down__go">Go!</div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
};

export default CountDown;
