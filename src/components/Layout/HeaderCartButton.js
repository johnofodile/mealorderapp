import {useReducer} from 'react';
import {useContext} from 'react';
import CartIcon from "../Cart/CartIcon";
import CartContext from '../../store/cart-context';
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  //we use context here 
   const cartCtx= useContext(CartContext);
//The reduce method below is the logic needed to add the number of items in the cart
   const numberOfCartItems=cartCtx.items.reduce((curNumber, item)  =>{
  return curNumber+item.amount;
  }, 0);
  return(
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
