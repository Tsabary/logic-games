import React from "react";
import OrderedImage from "./orderedImage";
import { ReorderInnerListProps } from "./utils/interfaces";
import { Asset } from "../utils/classes";

export default class InnerList extends React.Component<ReorderInnerListProps> {
  // We check to see of our values are the same or if they've changed. If they are the same we return false, as in it shouldn't update. Otherwise, update.
  shouldComponentUpdate(nextProps: ReorderInnerListProps) {
    if (nextProps.images === this.props.images) {
      return false;
    }
    return true;
  }

  render() {
    return this.props.images.map((image: Asset, index: number) => {
      return (
        <OrderedImage
          image={image}
          index={index}
          key={image.id}
          handleClick={this.props.handleClick}
        />
      );
    });
  }
}
