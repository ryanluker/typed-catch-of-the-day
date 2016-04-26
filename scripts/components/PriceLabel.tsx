import React = require("react");
import helpers from "../libs/helpers";
let h = new helpers();

export const PriceLabel = (props: {price: number}) => (
  <span className="price">{h.formatPrice(props.price)}</span>
);