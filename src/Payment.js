import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import reducer, { getBasketTotalThroughReduce } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  //Context API -- Pull the information from the data layer/ central store and update the information using dispatch
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  //For payments
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  //For payment to work with any payment processor like stripe, we need to generate
  //client secret, without it the customer can's make a payment.
  const [clientSecret, setClientSecret] = useState(true);

  //useEffect has some sort of dependency on wihch it runs e.g.
  // Following useEffect runs when the payment component loads and when the basket changes
  useEffect(() => {
    //Create a async function for generating the client secret and then we need to call
    // that async function. That's how an async function works
    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        //stripe expects the total in the currency subunits
        //e.g. for $10 total, we need to pass 1000 cents
        url: `/payments/create?total=${
          getBasketTotalThroughReduce(basket) * 100
        }`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("The Secret is -- ", clientSecret);
  // console.log("The person::", user);

  const handleSubmit = async (event) => {
    //Do all the fancy stripe stuff
    //Prevent from refreshing
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          //Find the card elements with details entered by the customer
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent is paymentConfirmation
        console.log("paymentIntent -- ", paymentIntent);
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        //Dispatch the event to central store, to empty the basket after successful payment.
        dispatch({
          type: "EMPTY_BASKET",
        });

        //Instead of history.push we use history.replace because we don't want them to
        //come to the payment page again when the user presses the back button
        //instead we want them to go the orders page. So essentially we have swapped the
        //payment page and the orders page here.
        history.replace("./orders");
      });
  };
  const handleChange = (event) => {
    //Listen for changes in the CardElement
    //and display any error as the customer types in their details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout ({<Link to="/checkout">{basket.length} items</Link>})</h1>
        {/* Payment Section1 - Delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p> {user?.email}</p>
            <p>927 React Street</p>
            <p>Pune, MH, India</p>
          </div>
        </div>
        {/* Payment Section2 - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment Section3 - Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic  */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotalThroughReduce(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* For showing errors - If there's any error then only show div with 
              error in*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
