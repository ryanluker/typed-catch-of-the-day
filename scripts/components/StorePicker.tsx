import * as React from "react";

import helpers from "../libs/helpers";
let h = new helpers();

/**
 * Store Picker
 */
export class StorePicker extends React.Component<any, any> {
  private storeInput: HTMLInputElement;

  private linkRef = (link: string) => {
    return (ref: any) => {
      this[link] = ref;
    };
  };

  private goToStore = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.history.replaceState(null, "/store/" + this.storeInput.value);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input type="text" ref={this.linkRef("storeInput")} defaultValue={h.getFunName()} required />
        <input type="submit" />
      </form>
    );
  }
}
