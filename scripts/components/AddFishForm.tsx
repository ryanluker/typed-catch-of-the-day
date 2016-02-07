import * as React from "react";
import {findDOMNode} from "react-dom";
import {FishObject} from "../interfaces";

import helpers from "../helpers";
let h = new helpers();

//Interfaces
interface AddFishProps {
  addFish(fish: FishObject);
}

/**
 * Add Fish Form
 */
export class AddFishForm extends React.Component<AddFishProps, any> {
  private createFish = (event: React.FormEvent) => {
    event.preventDefault();
    let fish: FishObject = {
      name  : findDOMNode<HTMLInputElement>(this.refs["name"]).value,
      price : parseInt(findDOMNode<HTMLInputElement>(this.refs["price"]).value),
      status: findDOMNode<HTMLInputElement>(this.refs["status"]).value,
      desc  : findDOMNode<HTMLInputElement>(this.refs["desc"]).value,
      image : findDOMNode<HTMLInputElement>(this.refs["image"]).value
    };
    this.props.addFish(fish);
    findDOMNode<HTMLFormElement>(this.refs["fishForm"]).reset();
  };
  render() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Item </button>
      </form>
    );
  }
}