export const initialState = {
  basket: [],
  user: null,
};
//Selector using higher order array method 'reduce'. It is a professional practice to write selectors in the reducers
export const getBasketTotalThroughReduce = (basket) =>
  basket?.reduce((amount, bitem) => bitem.price + amount, 0);

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket?.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "Cannot remove the item with id: ${action.id} as it is not present in the basket"
        );
      }

      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default reducer;
