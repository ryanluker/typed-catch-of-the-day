import * as React from "react";
import { PriceLabelProps } from "../libs/interfaces";

import helpers from "../libs/helpers";
let h = new helpers();

export const PriceLabel: React.StatelessComponent<PriceLabelProps> = ({price}) => (
  <span className="price">{h.formatPrice(price)}</span>
);