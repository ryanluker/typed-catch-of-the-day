jest.dontMock("../PriceLabel");
jest.dontMock("../../libs/helpers");

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import {PriceLabel} from "../PriceLabel";

describe("PriceLabel", () => {

  it("Renders and has nice looking price", () => {
    let PriceLabelStateless = TestUtils.renderIntoDocument(
      <div><PriceLabel price={120} /></div>
    );
    expect(TestUtils.isDOMComponent(PriceLabelStateless)).toBeTruthy();
    expect(ReactDOM.findDOMNode(PriceLabelStateless).textContent).toBe("$1.20");
  });

});