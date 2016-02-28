jest.dontMock("../AddFishButton");
jest.dontMock("../../libs/interfaces");

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import {AddButtonProps} from "../../libs/interfaces";

import {AddFishButton} from "../AddFishButton";

describe("AddFishButton", () => {

  it("Renders", () => {

    let addFishProps: AddButtonProps = {
      text: "What does here",
      isAvailable: false,
      addToOrder: function(){return;}
    };

    let AddFishStateless = TestUtils.renderIntoDocument(
      <div><AddFishButton {...addFishProps}/></div>
    );

    expect(ReactDOM.findDOMNode(AddFishStateless).textContent).toBe("What does here");
  });

});