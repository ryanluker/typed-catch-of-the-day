import * as React from "react";
import { render } from "react-dom";

import { createHistory } from "history";
import { Router, Route } from "react-router";

// Import Components
import { NotFound } from "./components/NotFound";
import { StorePicker } from "./components/StorePicker";
import { App } from "./components/App";

// Stylus
import "../css/style.styl";

/**
 * Routes
 */
var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

render(routes, document.getElementById("main"));