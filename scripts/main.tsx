import * as React from "react";
import { render, findDOMNode } from "react-dom";
import * as CSSTransitionGroup from "react-addons-css-transition-group";

import { createHistory } from "history";
import { Router, Route, History } from "react-router";

import helpers from "./helpers";
let h = new helpers();

// Import Components
import {NotFound} from "./components/NotFound";
import {StorePicker} from "./components/StorePicker";
import {Header} from "./components/Header";

// Stylus
import "../css/style.styl";

/**
 * Interfaces
 */

interface FishDataProps {
  key: number;
  index: number;
  details: FishObject;
  addToOrder(key: number);
}

interface OrderProps {
  fishes: Object;
  order: Object;
  removeFromOrder(key: string);
}

interface InventoryProps {
  addFish(fish: FishObject);
  loadSamples();
  fishes: Object;
  updateFish(key: string, attr: string, value: string | number);
  removeFish(key: string);
}

interface UpdateFishProps {
  key: string;
  index: string;
  fish: FishObject;
  updateFish(key: string, attr: string, value: string | number);
  removeFish(key: string);
}

interface FishOrderProps {
  key: string;
  index: string;
  fish: FishObject;
  count: number;
  removeFromOrder(key: string);
}

interface AddFishProps {
  /**
   * takes an object of type Fish and saves it to the app state fishes
   */
  addFish(fish: FishObject);
}

interface FishObject {
  name: string;
  price: number;
  status: string;
  desc: string;
  image: string;
}

/**
 * App container
 */
class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      fishes: {},
      order: {}
    };
  };

  componentDidMount() {
    this.loadOrderData();
    this.loadFishesData();
  };

  componentWillUpdate(nextProps, nextState) {
    this.storeOrderData(nextState.order);
    this.storeFishesData(nextState.fishes);
  };

  private storeOrderData = (data: Object) => {
    let order = JSON.stringify(data);
    localStorage.setItem("order-" + this.props.params.storeId, order);
  };

  private loadOrderData = () => {
    let storeRefOrder: string = localStorage.getItem("order-" + this.props.params.storeId);

    if(storeRefOrder) {
      this.setState({"order": JSON.parse(storeRefOrder)});
    }
  };

  private storeFishesData = (data: Object) => {
    let fishes = JSON.stringify(data);
    localStorage.setItem("fishes-" + this.props.params.storeId, fishes);
  };

  private loadFishesData = () => {
    let storeRefFishes: string = localStorage.getItem("fishes-" + this.props.params.storeId);

    if(storeRefFishes) {
      this.setState({"fishes": JSON.parse(storeRefFishes)});
    }
  };

  public removeFish = (key: string) => {
    if(confirm("Are you sure you wish to remove fish?")) {
      delete this.state.fishes[key];
      this.setState({fishes: this.state.fishes});
    }
  };

  public removeFromOrder = (key: string) => {
    delete this.state.order[key];
    this.setState({ order: this.state.order });
  };

  public addFish = (fish: FishObject) => {
    let timestamp = (new Date()).getTime();
    this.state.fishes["fish-" + timestamp] = fish;
    this.setState({fishes: this.state.fishes});
  };

  public updateFish = (key: string, attr: string, value: string | number) => {
    this.state.fishes[key][attr] = value;
    this.setState({fishes: this.state.fishes});
  };

  public loadSamples = () => {
    this.setState({
      fishes: require("./sample-fishes")
    });
  };

  public renderFish = (key: any) => {
    let fishData: FishDataProps = {
      key: key,
      index: key,
      details: this.state.fishes[key],
      addToOrder: this.addToOrder
    };
    return <Fish {...fishData}/>;
  };

  public addToOrder = (key: number) => {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order: this.state.order });
  };

  render() {
    let orderProps: OrderProps = {
      fishes: this.state.fishes,
      order: this.state.order,
      removeFromOrder: this.removeFromOrder
    };
    let inventoryProps: InventoryProps = {
      addFish: this.addFish,
      loadSamples: this.loadSamples,
      fishes: this.state.fishes,
      updateFish: this.updateFish,
      removeFish: this.removeFish
    };
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order {...orderProps}/>
        <Inventory {...inventoryProps}/>
      </div>
    );
  }
}

/**
 * Fish component
 */
class Fish extends React.Component<FishDataProps, any> {
  private onButtonClick = () => {
    this.props.addToOrder(this.props.index);
  };
  render() {
    let details = this.props.details;
    let isAvailable: boolean = (details.status === "available" ? true : false);
    let buttonText: string = (isAvailable ? "Add to Order" : "Sold Out!");
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
      </li>
    );
  }
}

/**
 * Add Fish Form
 */
class AddFishForm extends React.Component<AddFishProps, any> {
  private createFish = (event: React.FormEvent) => {
    event.preventDefault();
    let fish: FishObject = {
      name  : findDOMNode<HTMLInputElement>(this.refs["name"]).value,
      price : parseInt(findDOMNode<HTMLInputElement>(this.refs["price"]).value),
      status: findDOMNode<HTMLInputElement>(this.refs["status"]).value,
      desc  : findDOMNode<HTMLInputElement>(this.refs["desc"]).value,
      image : findDOMNode<HTMLInputElement>(this.refs["image"]).value
    };
    this.props.addFish(fish);
    findDOMNode<HTMLFormElement>(this.refs["fishForm"]).reset();
  };
  render() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Item </button>
      </form>
    );
  }
}

/**
 * Order Container
 */
class Order extends React.Component<OrderProps, any> {
  private renderOrders = ( orderIds: string[] ) => {
    return orderIds.map((key) => {
      let fishOrderProps: FishOrderProps = {
        key: key,
        index: key,
        fish: this.props.fishes[key],
        count: this.props.order[key],
        removeFromOrder: this.props.removeFromOrder
      };

      return (
        <FishOrder {...fishOrderProps}/>
      );
    });
  };

  render() {
    let orderIds = Object.keys(this.props.order);
    let total = orderIds.reduce((prevTotal, key) => {
      let fish: FishObject = this.props.fishes[key];
      let count: number = this.props.order[key];
      let isAvailable = fish && fish.status === "available";

      if(fish && isAvailable) {
        return prevTotal + (count * fish.price || 0);
      }
      return prevTotal;
    }, 0);

    let fishFlyIn = {
      component: "ul",
      transitionName: "order",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500,
      className: "order"
    };

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <CSSTransitionGroup {...fishFlyIn}>
          {this.renderOrders(orderIds)}
          <li className="total">
            <strong>Total:</strong>
            {h.formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }
}

class FishOrder extends React.Component<FishOrderProps, any> {
  private removeFromOrder = () => {
    this.props.removeFromOrder(this.props.index);
  };

  render() {
    let fish = this.props.fish;
    let count = this.props.count;
    let removeButton = <button onClick={this.removeFromOrder}>X</button>;
    let countWheel = {
      component: "span",
      transitionName: "count",
      className: "count",
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 250
    };

    if(!fish) {
      return <li key={this.props.index}>Sorry, fish no longer available! {removeButton}</li>;
    }
    return (
      <li key={this.props.index}>
        <CSSTransitionGroup {...countWheel}>
          <span key={count}>{count}</span>
        </CSSTransitionGroup>
        lbs {fish.name} {removeButton}
        <span className="price">{h.formatPrice(count * fish.price)}</span>
      </li>
    );
  }
}

/**
 * Update Fish Form
 */
class UpdateFishForm extends React.Component<UpdateFishProps, any> {
  /**
   * takes an attribute that will update based on value
   */
  private update = (attr: string) => {
    return (event: React.FormEvent) => {
      this.props.updateFish(this.props.index, attr, event.target["value"]);
    };
  };

  /**
   * takes the index prop and says to remove self
   */
  private remove = () => {
    this.props.removeFish(this.props.index);
  };

  render() {
    let fish = this.props.fish;
    return (
      <div className="fish-edit" ref="editFish">
        <input type="text" ref="name" value={fish.name} onChange={this.update("name")}/>
        <input type="text" ref="price" value={fish.price.toString()} onChange={this.update("price")}/>
        <select ref="status" value={fish.status} onChange={this.update("status")}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" value={fish.desc} onChange={this.update("desc")}/>
        <input type="text" ref="image" value={fish.image} onChange={this.update("image")}/>
        <button onClick={this.remove}>Remove Fish</button>
      </div>
    );
  }
}

/**
 * Inventory Component
 */
class Inventory extends React.Component<InventoryProps, any> {
  /**
   * takes the fishes and renders in the form fields
   * @params {string[]} fishes
   * @return jsx
   */
  private renderFishes = ( fishes: string[] ) => {
    return fishes.map((key) => {
      let updateFishProps: UpdateFishProps = {
        key: key,
        index: key,
        fish: this.props.fishes[key],
        updateFish: this.props.updateFish,
        removeFish: this.props.removeFish
      };
      return (
        <UpdateFishForm {...updateFishProps}/>
      );
    });
  };
  render() {
    let fishes = Object.keys(this.props.fishes);
    return (
      <div>
        <h2>Inventory</h2>
        {this.renderFishes(fishes)}
        <AddFishForm {...this.props}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
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
);

render(routes, document.getElementById("main"));