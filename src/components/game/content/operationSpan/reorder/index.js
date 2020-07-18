import "./styles.scss";
import React, { useState } from "react";
import strings from "../../../../../constants/localizedStrings";

const Reorder = ({ images, level, compareOrders, userOrder, setUserOrder }) => {


  const handleClick = (i) => {
    // If he user has ordered as many items as the level thy've just completed then they shouldn't be allowd to add any more choices
    if (userOrder.length === level && !userOrder.includes(i)) return;

    if (userOrder.includes(i)) {
      // If the user has already marked this image, we need to remove it from the order
      setUserOrder((uo) => uo.filter((index) => index !== i));
    } else {
      // Add this image to the order
      setUserOrder((uo) => [...uo, i]);
    }
  };

  const renderImages = (imgs, userOrder) => {
    return imgs.map((img) => {
      return (
        <div
          className="reorder__image"
          key={img.index}
          onClick={() => {
            handleClick(img.index);
          }}
        >
          {userOrder.includes(img.index) ? (
            <div className="reorder__image-position">
              {userOrder.indexOf(img.index) + 1}
            </div>
          ) : null}
          {img.icon}
        </div>
      );
    });
  };

  const handleSubmit = () => {
    compareOrders(userOrder);
    setUserOrder([]);
  };

  return (
    <div className="reorder">
      <div className="reorder__title">
        {level > 1
          ? `${strings.selectThe} ${level} ${strings.images}`
          : `${strings.selectThe} ${level} ${strings.image}`}
      </div>
      <div className="reorder__images">{renderImages(images, userOrder)}</div>
      <div
        className="button button--purple"
        style={{
          visibility: userOrder.length === level ? "visible" : "hidden",
        }}
        onClick={() => {
          userOrder.length === level
            ? handleSubmit()
            : console.log("Premature click");
        }}
      >
        {strings.submit}
      </div>
    </div>
  );
};

export default Reorder;
