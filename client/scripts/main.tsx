import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * App container
 */
class App extends React.Component<any, any> {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header />
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
class Header extends React.Component<any, any> {
  render() {
    return (
      <p>Header</p>
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

ReactDOM.render(<App/>, document.getElementById('main'));