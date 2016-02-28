import * as React from "react";
import { AddButtonProps } from "../libs/interfaces";

export const AddFishButton: React.StatelessComponent<AddButtonProps> = ({text, isAvailable, addToOrder}) => (
  <button disabled={!isAvailable} onClick={addToOrder}>{text}</button>
);