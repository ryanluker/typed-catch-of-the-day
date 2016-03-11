jest.dontMock("../PriceLabel");
jest.dontMock("../../libs/interfaces");

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import {PriceLabelProps} from "../../libs/interfaces";

import {PriceLabel} from "../PriceLabel";

describe("PriceLabel", () => {

  it("Renders", () => {
    let priceProps: PriceLabelProps = {
      price: 12
    };

    let PriceLabelStateless = TestUtils.renderIntoDocument(
      <div><PriceLabel {...priceProps} /></div>
    );
    expect(ReactDOM.findDOMNode(PriceLabelStateless).textContent).toBe("$0.12");
  });

});