import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotalThroughReduce } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  // For pulling the browser history
  const history = useHistory();

  //Pull information or change informartion with dispatch
  const [{ basket }, dispatch] = useStateValue();

  // const getBasketTotal = (basket) => {
  //   let basketTotal = 0;
  //   basket.forEach((basketItem) => (basketTotal += basketItem.price));
  //   return basketTotal;
  // };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Subtotal ({basket.length} items):
              <strong>{`${value}`}</strong> */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        // value={getBasketTotal(basket)}
        value={getBasketTotalThroughReduce(basket)} //passed as a render prop.
        //value={0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
