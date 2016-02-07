import * as React from "react";
import {FishDataProps} from "../interfaces";

import helpers from "../helpers";
let h = new helpers();

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
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
      </li>
    );
  }
}