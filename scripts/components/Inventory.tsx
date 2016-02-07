import * as React from "react";
import {InventoryProps, UpdateFishProps} from "../interfaces";

// Import Components
import {UpdateFishForm} from "./UpdateFishForm";
import {AddFishForm} from "./AddFishForm";

/**
 * Inventory Component
 */
export class Inventory extends React.Component<InventoryProps, any> {
  /**
   * takes the fishes and renders in the form fields
   * @params {string[]} fishes
   * @return jsx
   */
  private renderFishes = ( fishes: string[] ) => {
    return fishes.map((key) => {
      let updateFishProps: UpdateFishProps = {
        key: key,
        index: key,
        fish: this.props.fishes[key],
        updateFish: this.props.updateFish,
        removeFish: this.props.removeFish
      };
      return (
        <UpdateFishForm {...updateFishProps}/>
      );
    });
  };
  render() {
    let fishes = Object.keys(this.props.fishes);
    return (
      <div>
        <h2>Inventory</h2>
        {this.renderFishes(fishes)}
        <AddFishForm {...this.props}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}