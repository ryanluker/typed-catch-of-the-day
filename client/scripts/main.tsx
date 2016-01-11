import * as React from "react";
import { render, findDOMNode } from "react-dom";
import { createHistory } from "history";
import { Router, Route, History } from "react-router";

import helpers from "./helpers";
let h = new helpers();

/**
 * Interfaces
 */
interface HeaderProps {
  tagline: string;
}

interface FishDataProps {
  key: number;
  index: number;
  details: FishObject;
  addToOrder(key: number);
}

interface OrderProps {
  fishes: Object;
  order: Object;
}

interface InventoryProps {
  addFish(fish: FishObject);
  loadSamples();
  fishes: Object;
  updateFish(key: string, attr: string, value: string | number);
}

interface UpdateFishProps {
  key: string;
  index: string;
  fish: FishObject;
  updateFish(key: string, attr: string, value: string | number);
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
      order: this.state.order
    };
    let inventoryProps: InventoryProps = {
      addFish: this.addFish,
      loadSamples: this.loadSamples,
      fishes: this.state.fishes,
      updateFish: this.updateFish
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
      let fish: FishObject = this.props.fishes[key];
      let count: number = this.props.order[key];

      if(!fish) {
        return <li key={key}>Sorry, fish no longer available!</li>;
      }
      return (
        <li key={key}>
          <span>{count}lbs</span>
          <span>{fish.name}</span>
          <span className="price">{h.formatPrice(count * fish.price)}</span>
        </li>
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

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <ul className="order">
          {this.renderOrders(orderIds)}
          <li className="total">
            <strong>Total:</strong>
            {h.formatPrice(total)}
          </li>
        </ul>
      </div>
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

  render() {
    let fish = this.props.fish;
    return (
      <div className="fish-edit" ref="editFish">
        <input type="text" ref="name" value={fish.name} onChange={this.update("name")}/>
        <input type="text" ref="price" value={fish.price.toString()} onChange={this.update("price")} />
        <select ref="status" value={fish.status} onChange={this.update("status")}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" value={fish.desc} onChange={this.update("desc")}/>
        <input type="text" ref="image" value={fish.image} onChange={this.update("image")}/>
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
        updateFish: this.props.updateFish
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
    );
  }
}

/**
 * Store Picker example
 */
class StorePicker extends React.Component<any, any> {
  private goToStore = (event: React.FormEvent) => {
    event.preventDefault();
    let storeInput = findDOMNode<HTMLInputElement>(this.refs["storeId"]);
    this.props.history.replaceState(null, "/store/" + storeInput.value);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="submit" />
      </form>
    );
  }
}

/**
 * Not Found
 */
class NotFound extends React.Component<any, any> {
  render() {
    return (
      <h1>Not Found</h1>
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