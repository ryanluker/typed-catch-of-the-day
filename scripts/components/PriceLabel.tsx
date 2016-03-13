import React = require("react");
import helpers from "../libs/helpers";
let h = new helpers();

export const PriceLabel = ({price = 0}) => (
  <span className="price">{h.formatPrice(price)}</span>
);