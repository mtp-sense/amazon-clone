import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

// Object destructring in the following function component
function Product({ id, title, image, price, rating }) {
  //Context API - Pull information or change informartion with dispatch in the central store/data layer
  const [{ basket }, dispatch] = useStateValue();
  //console.log("This is the basket::: ", basket);

  //addToBasket function is used to dispatch the item in the data layer
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id, //We can also write id:id as just id as both key value have same variable name.
        title: title, // Same as above for title
        image: image, // Same as above for image
        price: price, // Same as above for price
        rating: rating, // Same as above for rating
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {/* It creates an empty array with elements passed as rating with initial value as null or undefined.
          And then maps the array with a star for every element. map(_,i) -- Means we don't care about the first parameter */}
          {Array(rating)
            .fill()
            .map(() => (
              <p>⭐️</p>
            ))}
        </div>
      </div>
      <img src={image} alt="Product Image" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
