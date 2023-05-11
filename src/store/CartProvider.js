import CartContext from "./cart-context";
import { useReducer } from "react";

//WE MUST SET A DEFAULT CART STATE
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//----2----2this reducer  function is a helper that initiates what happens when the add action from cartProvider function is initiated

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const UpdatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // here we mark the index of each of the items in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
  //the function below would return true if that item with particular index exists in the cart
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    //if it is true, then we perform the next task(this logic checks if element is already part of the cart array)
    if (existingCartItem){
    const    updatedItem={
            //we get the snapshot of the old cart item then calculate the new amount
            ...existingCartItem,
            amount:existingCartItem.amount  + action.item.amount

        };
        //here we first copy all the previos items
        updatedItems=[...state.items];
        //next we override the array with the new item
        updatedItems[existingCartItemIndex]=updatedItem;
    }else{
        //if item is added for the first time
    
         updatedItems= state.items.concat(action.item);

    }
      return {
        //then we return the new state snapshot which picks up the values
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
  }

  return defaultCartState;
};

//HERE THE USE REDUCER IS INITIATED.
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  //----1------hERE IS A SIMPLE ACT OF BINDING TO ADD ACTION BUT THE REDUCER NOW STATES WHAT SHOULD HAPPEN AFFTER THE BINDING
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
