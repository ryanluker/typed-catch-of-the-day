import * as React from "react";
import { findDOMNode } from "react-dom";

import helpers from "../helpers";
let h = new helpers();

/**
 * Store Picker
 */
export class StorePicker extends React.Component<any, any> {
  private goToStore = (event: React.FormEvent) => {
    event.preventDefault();
    let storeInput = findDOMNode<HTMLInputElement>(this.refs["storeId"]);
    this.props.history.replaceState(null, "/store/" + storeInput.value);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="submit" />
      </form>
    );
  }
}
