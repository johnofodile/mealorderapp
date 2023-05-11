import classes from "./MealItemForm.module.css";
import { useContext } from "react";
import Input from "../../UI/Input";
import React, { useRef, useState } from "react";
import CartContext from '../../../store/cart-context'


//we use ref here because this the final parent component for the input field
//use state is importee in order to use state to print label error message

const MealItemForm = (props) => {
    //here we create the context connection so we can use its methods
    const cartCtx=useContext(CartContext);
  //use state is declared here so that the label containing error message is effected
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    //the entered amount is always a string so we can convert it now to a number using the function below

    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      //if the amount entered is not valid then we set the state to false then write the code to print the error message
      setAmountIsValid(false);
      return;
    }
    //if the amount is valid, then we use props to add the amount to cart.The props will be defined in the meal item component
    //we didnt use context because we have more things to add to the cart and not just theamount
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
    //   we use ref here to point to this component because the context is need here
    //since there,s a custom component, Input.js we have to go there, forward the ref and point to where the value(amount) is taken from
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",

          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {/* below we create a new paragragh that prints the error message */}
      {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  );
};
export default MealItemForm;
