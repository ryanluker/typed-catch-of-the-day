import * as React from "react";
import * as CSSTransitionGroup from "react-addons-css-transition-group";
import {FishOrderProps} from "../interfaces";

import helpers from "../helpers";
let h = new helpers();

export class FishOrder extends React.Component<FishOrderProps, any> {
  private removeFromOrder = () => {
    this.props.removeFromOrder(this.props.index);
  };

  render() {
    let fish = this.props.fish;
    let count = this.props.count;
    let removeButton = <button onClick={this.removeFromOrder}>X</button>;
    let countWheel = {
      component: "span",
      transitionName: "count",
      className: "count",
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 250
    };

    if(!fish) {
      return <li key={this.props.index}>Sorry, fish no longer available! {removeButton}</li>;
    }
    return (
      <li key={this.props.index}>
        <CSSTransitionGroup {...countWheel}>
          <span key={count}>{count}</span>
        </CSSTransitionGroup>
        lbs {fish.name} {removeButton}
        <span className="price">{h.formatPrice(count * fish.price)}</span>
      </li>
    );
  }
}