import * as React from "react";
import { AddFishButton } from "./AddFishButton";
import { PriceLabel } from "./PriceLabel";
import { FishDataProps } from "../libs/interfaces";

/**
 * Fish component
 */
export class Fish extends React.Component<FishDataProps, any> {
  private onButtonClick = () => {
    this.props.addToOrder(this.props.index);
  };
  render() {
    let details = this.props.details;
    let isAvailable: boolean = (details.status === "available" ? true : false);
    let buttonText: string = (isAvailable ? "Add to Order" : "Sold Out!");

    let AddProps = {
      text: buttonText,
      isAvailable: isAvailable,
      addToOrder: this.onButtonClick
    };

    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <PriceLabel price={details.price} />
        </h3>
        <p>{details.desc}</p>
        <AddFishButton {...AddProps} />
      </li>
    );
  }
}