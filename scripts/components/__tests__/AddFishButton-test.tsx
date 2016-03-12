jest.dontMock("../AddFishButton");

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import {AddFishButton} from "../AddFishButton";

describe("AddFishButton", () => {

  it("Renders", () => {

    let addFishProps = {
      text: "What goes here",
      isAvailable: false,
      addToOrder: function(){return;}
    };

    let AddFishStateless = TestUtils.renderIntoDocument(
      <div><AddFishButton {...addFishProps}/></div>
    );

    expect(ReactDOM.findDOMNode(AddFishStateless).textContent).toBe("What goes here");
    expect(ReactDOM.findDOMNode(AddFishStateless).innerHTML).toContain("disabled");
  });

});