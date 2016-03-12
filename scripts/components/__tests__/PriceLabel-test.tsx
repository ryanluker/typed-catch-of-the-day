jest.dontMock("../PriceLabel");

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import {PriceLabel} from "../PriceLabel";

describe("PriceLabel", () => {

  it("Renders", () => {
    let PriceLabelStateless = TestUtils.renderIntoDocument(
      <div><PriceLabel price={120} /></div>
    );
    expect(TestUtils.isDOMComponent(PriceLabelStateless)).toBeTruthy();
  });

});