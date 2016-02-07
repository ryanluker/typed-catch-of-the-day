import * as React from "react";
import {UpdateFishProps} from "../interfaces";

/**
 * Update Fish Form
 */
export class UpdateFishForm extends React.Component<UpdateFishProps, any> {
  /**
   * takes an attribute that will update based on value
   */
  private update = (attr: string) => {
    return (event: React.FormEvent) => {
      this.props.updateFish(this.props.index, attr, event.target["value"]);
    };
  };

  /**
   * takes the index prop and says to remove self
   */
  private remove = () => {
    this.props.removeFish(this.props.index);
  };

  render() {
    let fish = this.props.fish;
    return (
      <div className="fish-edit" ref="editFish">
        <input type="text" ref="name" value={fish.name} onChange={this.update("name")}/>
        <input type="text" ref="price" value={fish.price.toString()} onChange={this.update("price")}/>
        <select ref="status" value={fish.status} onChange={this.update("status")}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" value={fish.desc} onChange={this.update("desc")}/>
        <input type="text" ref="image" value={fish.image} onChange={this.update("image")}/>
        <button onClick={this.remove}>Remove Fish</button>
      </div>
    );
  }
}