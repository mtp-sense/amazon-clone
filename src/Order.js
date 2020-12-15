import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  //props - instead of the props, we destructure it and take just the order
  console.log("Order:", order);
  return (
    <div className="order">
      <h2>Order</h2>
      {/* The timestamp in the order is known as unix time stamp */}
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      {/* <p>{moment.unix(order.data.created).format()}</p> */}
      <p className="order__id">
        <small>{order.id}</small>
      </p>

      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          rating={item.rating}
          price={item.price}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        // value={getBasketTotal(basket)}
        value={order.data.amount / 100} //passed as a render prop.
        //value={0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default Order;
