import * as React from "react";
import * as CSSTransitionGroup from "react-addons-css-transition-group";
import { FishData, OrderProps, FishOrderProps } from "../libs/interfaces";

import { FishOrder } from "./FishOrder";

import helpers from "../libs/helpers";
let h = new helpers();

/**
 * Order Container
 */
export class Order extends React.Component<OrderProps, any> {
  private renderOrders = ( orderIds: string[] ) => {
    return orderIds.map((key) => {
      let fishOrderProps: FishOrderProps = {
        key: key,
        index: key,
        fish: this.props.fishes[key],
        count: this.props.order[key],
        removeFromOrder: this.props.removeFromOrder
      };

      return (
        <FishOrder {...fishOrderProps}/>
      );
    });
  };

  render() {
    let orderIds = Object.keys(this.props.order);
    let total = orderIds.reduce((prevTotal, key) => {
      let fish: FishData = this.props.fishes[key];
      let count: number = this.props.order[key];
      let isAvailable = fish && fish.status === "available";

      if(fish && isAvailable) {
        return prevTotal + (count * fish.price || 0);
      }
      return prevTotal;
    }, 0);

    let fishFlyIn = {
      component: "ul",
      transitionName: "order",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500,
      className: "order"
    };

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <CSSTransitionGroup {...fishFlyIn}>
          {this.renderOrders(orderIds)}
          <li className="total">
            <strong>Total:</strong>
            {h.formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }
}