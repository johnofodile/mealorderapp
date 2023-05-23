import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  //we would use states to declare when the entered values are correct
  // we call the use ref here
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    //now we call the function we created at the top
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = !isEmpty(enteredPostalCode);
    const enteredCityIsValid = isFiveChars(enteredCity);
    //the form is valid if only all four conditions below are valid

setFormInputValidity({
    name:enteredNameIsValid,
    street:enteredStreetIsValid,
    postalCode:enteredPostalIsValid,
    city:enteredCityIsValid,
   

});





    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      //submit the cart data
      return;
    }
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
    {/* we use string literals below because we want to use two different classes, control and invalid.We only use invalid if the name is not valid */}
    {/* if the name is valid donot add any class otherwise add a class */}
      <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Your name</label>
        {/* id below must match the html for value above */}
        <input type="text" id="name" ref={nameInputRef} />
        {/* here we can now throw error message if it is false */}
        {!formInputValidity.name && <p>please enter a valid name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        {/* id below must match the html for value above */}
        <input type="text" id="street" ref={streetInputRef} />
          {/* here we can now throw error message if it is false */}
        {!formInputValidity.street && <p>please enter a valid street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal code</label>
        {/* id below must match the html for value above */}
        <input type="text" id="postal" ref={postalInputRef} />
          {/* here we can now throw error message if it is false */}
        {!formInputValidity.postalCode && <p>please enter a valid postalCode</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">city</label>
        {/* id below must match the html for value above */}
        <input type="text" id="city" ref={cityInputRef} />
          {/* here we can now throw error message if it is false */}
        {!formInputValidity.city && <p>please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        {/* type below is set to button so that the button should not be able to submit the form */}
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
