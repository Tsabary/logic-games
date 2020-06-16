import "./styles.scss";
import React from "react";

const CountDown = ({ timeToStart }) => {
  const renderRays = () => {
    let rays = [];
    for (let i = 0; i < 10; i++) {
      rays.push(<div className="count-down__ray" />);
    }

    return rays;
  };

  return (
    <div className="count-down">
      {timeToStart > 1 ? (
        <div className="count-down__count">{Math.floor(timeToStart)}</div>
      ) : (
        <div className="count-down__go">Go!</div>
      )}

      {/* {renderRays()} */}
    </div>
  );
};

export default CountDown;
