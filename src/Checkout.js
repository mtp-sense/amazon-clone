import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct.js";
import FlipMove from "react-flip-move";

function Checkout() {
  //Context API - Pull information or change informartion with dispatch in central store/data layer
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="This is an ad."
        />
        <div>
          {/* The '?' in user?.email is called an optional chaining which is used
          for gracefully handling the null object error. There is a
          asynchronous period, while it won't load a user because it is
          actually trying to fetch it from the firebase. */}
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          <FlipMove>
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              ></CheckoutProduct>
            ))}
          </FlipMove>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal></Subtotal>
      </div>
    </div>
  );
}

export default Checkout;
