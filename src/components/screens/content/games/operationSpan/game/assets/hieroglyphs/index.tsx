import "./styles.scss";
import React from "react";

import { Asset } from "../../../utils/classes";

import { ReactComponent as Hier1 } from "../../../../../../../assets/hieroglyphs/hier1.svg";
import { ReactComponent as Hier2 } from "../../../../../../../assets/hieroglyphs/hier2.svg";
import { ReactComponent as Hier3 } from "../../../../../../../assets/hieroglyphs/hier3.svg";
import { ReactComponent as Hier4 } from "../../../../../../../assets/hieroglyphs/hier4.svg";
import { ReactComponent as Hier5 } from "../../../../../../../assets/hieroglyphs/hier5.svg";
import { ReactComponent as Hier6 } from "../../../../../../../assets/hieroglyphs/hier6.svg";
import { ReactComponent as Hier7 } from "../../../../../../../assets/hieroglyphs/hier7.svg";
import { ReactComponent as Hier8 } from "../../../../../../../assets/hieroglyphs/hier8.svg";
import { ReactComponent as Hier9 } from "../../../../../../../assets/hieroglyphs/hier9.svg";
import { ReactComponent as Hier10 } from "../../../../../../../assets/hieroglyphs/hier10.svg";
import { ReactComponent as Hier11 } from "../../../../../../../assets/hieroglyphs/hier11.svg";
import { ReactComponent as Hier12 } from "../../../../../../../assets/hieroglyphs/hier12.svg";
import { ReactComponent as Hier13 } from "../../../../../../../assets/hieroglyphs/hier13.svg";
import { ReactComponent as Hier14 } from "../../../../../../../assets/hieroglyphs/hier14.svg";

const hieroglyphs: Asset[] = [
  new Asset(
    "0",
    (
      <div className="icon__container">
        <Hier1 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),

  new Asset(
    "1",
    (
      <div className="icon__container">
        <Hier2 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),
  new Asset(
    "2",
    (
      <div className="icon__container">
        <Hier3 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),
  new Asset(
    "3",
    (
      <div className="icon__container">
        <Hier4 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),
  new Asset(
    "4",
    (
      <div className="icon__container">
        <Hier5 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),
  new Asset(
    "5",
    (
      <div className="icon__container">
        <Hier6 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),
  new Asset(
    "6",
    (
      <div className="icon__container">
        <Hier7 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),
  new Asset(
    "7",
    (
      <div className="icon__container">
        <Hier8 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),
  new Asset(
    "8",
    (
      <div className="icon__container">
        <Hier9 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),
  new Asset(
    "9",
    (
      <div className="icon__container">
        <Hier10 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),

  new Asset(
    "10",
    (
      <div className="icon__container">
        <Hier11 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),

  new Asset(
    "11",
    (
      <div className="icon__container">
        <Hier12 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),

  new Asset(
    "12",
    (
      <div className="icon__container">
        <Hier13 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),
  new Asset(
    "13",
    (
      <div className="icon__container">
        <Hier14 className="icon" style={{ fill: "black" }} />
      </div>
    )
  ),
];

export default hieroglyphs;
