import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';



//The available meals component renders all the meal items


const MealItem = (props) => {
  //here we bind to the cartcontext context so we can have the ability to perform the 
  //add opeartion using the values we get from the meal item form


  const cartCtx=useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const addToCartHandler=amount =>{

    // we use amount as a parameter here because the amount would be passed from the MealItemForm.js component
//addItem below is from the cart-context.js file
cartCtx.addItem({
  id:props.id,
  name:props.name,
  //the amount below just points at the amount stated above in the addToCartHandler function
  amount:amount,
  price:props.price
})
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        </div>
        <div>
       // The add to cart handler is found on the mealitem form
        <MealItemForm onAddToCart={addToCartHandler}/>
        </div>
    </li>
  );
};



export default MealItem;
