import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue(); //React context API
  const [orders, setOrders] = useState([]); //React Hook
  useEffect(() => {
    // If a user exists, fetch all its orders from firebase database which are
    //Ordered in descending order of their date ceated. In following code snippet,
    //snapshot gives us real-time snapshot of the database meaning what the db looks
    // like at that time (If we push a value in the db or remove a value from the db
    // snapshot provides a real-time response.)
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapShot) => {
          setOrders(
            snapShot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      //If user doesn't exist then set its order to an empty array.
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="oredrs__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
