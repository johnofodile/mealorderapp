import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

//we import use context here too because we need to use the context here
//when using the use context, we always have to import the cart context as well

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)} `;
  const hasItems = cartCtx.items.length > 0;
  //this will trigger the remove from cart functionality
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  //this will trigger the add item function in the card provider component
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item)
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        //we must pass an id since we are dealing with a list
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          //we use bind so we can bind the id or item to perform the task
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        {/* <span>Total amount</span> intial dummy undynamic amount */}
        <span>{totalAmount}</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
