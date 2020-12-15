// const { createContext } = require("react");

import React, { createContext, useContext, useReducer } from "react";

//Prepares the data layer
export const StateContext = createContext();

//Wrap our app and provides the data layer to every component in our app
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//Pull information from our data layer
export const useStateValue = () => useContext(StateContext);
