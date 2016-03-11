jest.dontMock("../Fish");
jest.dontMock("../AddFishButton");
jest.dontMock("../PriceLabel");
jest.dontMock("../../libs/interfaces");

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import {FishDataProps} from "../../libs/interfaces";

import {Fish} from "../Fish";

describe("Fish", () => {

  it("Exists", () => {
    let FishData: FishDataProps = {
      key: 1,
      index: 1,
      details: {
        name: "fish",
        price: 12,
        status: "available",
        desc: "a fine fish",
        image: "test.png"
      },
      addToOrder(key: number){return;}
    };

    let FishComp = TestUtils.renderIntoDocument(
      <Fish {...FishData}/>
    );
    expect(TestUtils.isCompositeComponent(FishComp)).toBeTruthy();
  });

  it("Has data", () => {
    let FishData: FishDataProps = {
      key: 1,
      index: 1,
      details: {
        name: "fish",
        price: 12,
        status: "available",
        desc: "a fine fish",
        image: "test.png"
      },
      addToOrder(key: number){return;}
    };

    let fishComp = TestUtils.renderIntoDocument(
      <Fish {...FishData}/>
    );

    let name = TestUtils.findRenderedDOMComponentWithClass(fishComp, "fish-name");
    expect(name.textContent).toContain(FishData.details.name);
    let price = TestUtils.findRenderedDOMComponentWithClass(fishComp, "price");
    expect(price.textContent).toContain(FishData.details.price.toString());
    let desc = TestUtils.findRenderedDOMComponentWithTag(fishComp, "p");
    expect(desc.textContent).toEqual(FishData.details.desc);
    let button = TestUtils.findRenderedDOMComponentWithTag(fishComp, "button");
    expect(button.textContent).toEqual("Add to Order");
  });

  it("Button switches to sold out", () => {
    let FishData: FishDataProps = {
      key: 1,
      index: 1,
      details: {
        name: "fish",
        price: 12,
        status: "available",
        desc: "a fine fish",
        image: "test.png"
      },
      addToOrder(key: number){return;}
    };
    let fishComp = TestUtils.renderIntoDocument(
      <Fish {...FishData}/>
    );
    let button = TestUtils.findRenderedDOMComponentWithTag(fishComp, "button");
    expect(button.textContent).toEqual("Add to Order");

    FishData.details.status = "nope";
    let fishCompNew = TestUtils.renderIntoDocument(
      <Fish {...FishData}/>
    );
    let buttonNew = TestUtils.findRenderedDOMComponentWithTag(fishCompNew, "button");
    expect(buttonNew.textContent).toEqual("Sold Out!");
  });
});