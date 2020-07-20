import React from "react";
import OrderedImage from "./orderedImage";

export default class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.images === this.props.images) {
      return false;
    }
    return true;
  }

  render() {
    return this.props.images.map((image, index) => {
        return <OrderedImage image={image} index={index} key={image.id} handleClick={this.props.handleClick}/>;
    });
  }
}
