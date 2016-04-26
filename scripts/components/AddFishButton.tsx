import React = require("react");
import {AddButtonProps} from "../libs/interfaces";

export const AddFishButton = (props: AddButtonProps) => (
  <button disabled={!props.isAvailable} onClick={props.addToOrder}>{props.text}</button>
);