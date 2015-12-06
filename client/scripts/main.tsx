import * as React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import { Router, Route } from 'react-router';

/**
 * Interfaces
 */
interface HeaderProps {
  tagline: string
}

/**
 * App container
 */
class App extends React.Component<any, any> {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory />
      </div>
    )
  }
}

/**
 * Order Container
 */
class Order extends React.Component<any, any> {
  render() {
    return (
      <p>Order</p>
    )
  }
}

/**
 * Inventory Component
 */
class Inventory extends React.Component<any, any> {
  render() {
    return (
      <p>Inventory</p>
    )
  }
}

/**
 * Header Component
 */
class Header extends React.Component<HeaderProps, any> {
  render() {
    return (
      <header className="top">
        <h1>
          Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
        </h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
}

/**
 * Store Picker example
 */
class StorePicker extends React.Component<any, any> {
  render() {
    return (
      <form className="store-selector">
        <h2>Please Enter a Store</h2>
        <input type="text" ref="storeId" required />
        <input type="submit" />
      </form>
    )
  }
}

/**
 * Not Found
 */
class NotFound extends React.Component<any, any> {
  render() {
    return (
      <h1>Not Found</h1>
    )
  }
}

/**
 * Routes
 */
var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

render(routes, document.getElementById('main'));