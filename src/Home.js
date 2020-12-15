import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="Banner"
        />
        <div className="home__row">
          {/* <Product
            id="12321341"
            title="The lean startup: How Constant Innovation Creates Radically Successful Business Paperback"
            price={1600.56}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
          /> */}
           <Product
            id="12321341"
            title="Think Like a Monk Paperback by Jay Shetty"
            price={325.00}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/41gVhoPaE5L._SX323_BO1,204,203,200_.jpg"
          />
          <Product
            id="49538094"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={17742.21}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/81QkLzXfKHL._SX569_.jpg"
          />
          <Product
            id="49538095"
            title="Bedtime Originals Choo Choo Express Plush Elephant - Humphrey"
            price={730.75}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/81-80FPGX0L._AC_SL1500_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="4903850"
            title="Fitbit Charge 3 Fitness Activity Tracker"
            price={14791.83}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
          />
          {/* <Product
            id="23445930"
            title="Amazon Echo (3rd Generation) | Smart speaker with Alexa, Charcoal fabric"
            price={7305.31}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
          /> */}
          <Product
            id="23445930"
            title="Kitchen Utensils, Silicone Heat-Resistant Non-Stick Kitchen Utensil Set Cooking Tools,Turner, Whisk, Spoon,Brush,Spatula, Ladle Slotted Turner Tongs Pasta Fork (woodgreen 19)"
            price={2499.00}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/71k1vxoT9IL._SL1436_.jpg"
          />
          <Product
            id="3254354345"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={44303.01}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
          />
          <Product
            id="3254354346"
            title="G Eau our version of Acqua Di Gio EDT"
            price={920.84}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/61m2S2rzc0L._SL1355_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="90829332"
            title="Samsung LC49RG90SSUXEN 49' Curved Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={80964.91}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
          />
          <Product
            id="90829332"
            title="Easyday Futura Set of 4 Plastic Chairs & 1 Vegas Centre Table Combo for Home, Garden & Living Room (Brown)"
            price={4699.12}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/A1tS-vb5XaL._SL1500_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
