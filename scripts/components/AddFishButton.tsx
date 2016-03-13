import React = require("react");

export const AddFishButton = ({text = "default", isAvailable = true, addToOrder}) => (
  <button disabled={!isAvailable} onClick={addToOrder}>{text}</button>
);