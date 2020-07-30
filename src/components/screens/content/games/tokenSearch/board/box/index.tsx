import "./styles.scss";
import React, { useState, useEffect } from "react";

interface BoxProps {
  boxIndex: number;
  indicatorClassname: string;
  /**
   * The handleBoxClick is a function that returns nothing.
   * All the paramaters it needs, are populated before it is passed to the box component. The only paramater it needs from us is to pass it another function, with no return value.
   * The function we pass to it is our custom setTimout function. Our setTimeout function itself also expects a function with no return value.
   * What our set function does is first clear any timeouts it was set to previously, and then set a new timeout of 500 milliseconds. When they pass, it will first uncheck the checkbox which controls our indicator's visibility, and then will execute whatever function was passed to it
   */
  // handleBoxClick: (fn: (fn2: () => any) => void) => void;
  handleBoxClick: (fn: () => void) => void;
}

export default ({ boxIndex, indicatorClassname, handleBoxClick }: BoxProps) => {
  const [isClicked, setIsClicked] = useState(false);

  let to: NodeJS.Timeout | null = null;

  const setTO = () => {
    clearTo(to);
    to = setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  const clearTo = (to: NodeJS.Timeout | null) => {
    if (to) clearTimeout(to);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    handleBoxClick(setTO);
  };

  useEffect(() => {
    return () => {
      clearTo(to);
    };
  }, [to]);

  return (
    <div className="box__container">
      <input
        className="box__checkbox"
        type="checkbox"
        checked={isClicked}
        id={`box__checkbox--${boxIndex}`}
        readOnly
      />
      <label
        className="box--default"
        onClick={handleClick}
        htmlFor={`box__checkbox--${boxIndex}`}
      />
      <div className={indicatorClassname} />
    </div>
  );
};
