import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

//we import use context here too because we need to use the context here
//when using the use context, we always have to import the cart context as well

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  //now i want to handle the submission success state when the form is succesfully submitted

  const [isSubmitting, setIsSubmitting]= useState(false);
  const [didSubmit, setDidSubmit]=useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)} `;
  const hasItems = cartCtx.items.length > 0;
  //this will trigger the remove from cart functionality
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  //this will trigger the add item function in the card provider component
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler=async (userData)=>{
    setIsSubmitting(true);
    //here we send the data to a new node in the firebase database using a post request
  const response= await fetch('https://http-2-ef582-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
        method: 'POST',
        body:JSON.stringify({

          user: userData,
          orderedItems:cartCtx.items

        })
      });
  setIsSubmitting(false);
  setDidSubmit(true);
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
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  //i want to swap all the content of the cart when submitting the cart
//we should wrap it with react.fragment becaome we have many components that need a single parent component
  const cartModalContent=  <React.Fragment> {cartItems}
  <div className={classes.total}>
    {/* <span>Total amount</span> intial dummy undynamic amount */}
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckout && <Checkout onConfirm={submitOrderHandler}  onCancel={props.onClose}/>}
  {!isCheckout && modalActions}
  </React.Fragment>

  //i want to show this particular content if it is still submitting

  const isSubmittingModalContent=<p>Sending order data...</p>

  //i want to show this message if i submitted succesfully
  const didSubmitModalContent=<p>Succesfully sent the order!</p>

  return (
    <Modal onClick={props.onClose}>
    {/* //so i only want to show that full cart content if it is not submitting */}
    {!isSubmitting && !didSubmit && cartModalContent}
    {/* if it is submitting, then i want to show the is submitting modal content */}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && didSubmitModalContent}

    </Modal>
  );
};

export default Cart;
