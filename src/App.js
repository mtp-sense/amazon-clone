import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header.js";
import Home from "./Home.js";
import Checkout from "./Checkout.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HdwB1EZHOPaLKfgf49preZt8G3KsgLVHaF2WsYhtxjHhDfcTuHn4k6cUZ0LyQN4dtO7DUoEU3XBsgMvlhYANmsQ00ipVG04Uv"
);
function App() {
  //Context API -  Pull information or change informartion with dispatch in the central store/data layer
  const [{}, dispatch] = useStateValue();
  //Create a listener for tracking who is logged in. useEffect has an arrow function inside it and an input condition based on which the arrow function runs.
  //For [] as input condition means executing the arrow function just once when the app component loads.
  //For [user,basket] as input condition, the arrow function executes when the user changes or the basket changes. etc.
  // So useEffect is like an if statement in react.
  useEffect(() => {
    //Runs only when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("THE LOGGED IN USER -- ", authUser);
      if (authUser) {
        //If the user is just logged in / the user was logged in before.
        // (When we refresh the page the firebase )
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //The user is logged out.
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    //BEM naming convention
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
