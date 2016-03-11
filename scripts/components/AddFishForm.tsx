import * as React from "react";
import { FishData } from "../libs/interfaces";

//Interfaces
interface AddFishProps {
  addFish(fish: FishData);
}

/**
 * Add Fish Form
 */
export class AddFishForm extends React.Component<AddFishProps, any> {
  private fishForm: HTMLFormElement;
  private nameInput: HTMLInputElement;
  private priceInput: HTMLInputElement;
  private statusOption: HTMLSelectElement;
  private descText: HTMLTextAreaElement;
  private imageInput: HTMLInputElement;

  private linkRef = (link: string) => {
    return (ref: any) => {
      this[link] = ref;
    };
  };

  private createFish = (event: React.FormEvent) => {
    event.preventDefault();
    let fish: FishData = {
      name  : this.nameInput.value,
      price : parseInt(this.priceInput.value),
      status: this.statusOption.value,
      desc  : this.descText.value,
      image : this.imageInput.value
    };
    this.props.addFish(fish);
    this.fishForm.reset();
  };

  render() {
    return (
      <form className="fish-edit" ref={this.linkRef("fishForm")} onSubmit={this.createFish}>
        <input type="text" ref={this.linkRef("nameInput")} placeholder="Fish Name"/>
        <input type="text" ref={this.linkRef("priceInput")} placeholder="Fish Price" />
        <select ref={this.linkRef("statusOption")}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref={this.linkRef("descText")} placeholder="Desc"></textarea>
        <input type="text" ref={this.linkRef("imageInput")} placeholder="URL to Image" />
        <button type="submit">+ Add Item </button>
      </form>
    );
  }
}