import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

//now we fetch the data directly from firebase database




//when we have an array which we plan to cast, we always have to map get the structure we need

const AvailableMeals = () => {
  //we should use state so that when component is rendered we can also see the available meals

  const [meals, setMeals]=useState([]);

//the function we pass to use effect should not return a promise.This fetch always returns a promise
//we want to add different states so that 

const [isLoading, setIsLoading]=useState(true);


//now we check for errors

const [httpError, setHttpError] =useState();

  useEffect(()=>{
    //this is the only way we can use async when using useeffect.By this way, the function does not return a promise


    const fetchMeals=async()=>{
   const response=await fetch('https://http-2-ef582-default-rtdb.europe-west1.firebasedatabase.app/meals.json');


   if(!response.ok){
    //when we throw a new error ther lines following donot execute so we leave the fetch meals function
  throw new Error('Something went wrong');
   }
   const responseData=await response.json();
  

  //the response data is an object and i want to convert it to an array of objects
  //the array is initially empty and later it is fetched from firebase
  //we use use effect and state to render the meals to the web page
  const loadedMeals =[];

  for(const key in responseData){
    loadedMeals.push({
      id: key,
      name:responseData[key].name,
      description:responseData[key].description,
      price:responseData[key].price,
      
    });

  }

  setMeals(loadedMeals);
  //after setting the meals we should set isloading to false
  setIsLoading(false);


    };
    // try{
// because fetch meals method below is a promise which must return something we cannot use traditional try catch on it 
//   fetchMeals();
//   //the error in the next line is from the throw new catch line above
//     }catch(error){
// setIsLoading(false);

// setHttpError(error.message);
//     }
fetchMeals().catch((error)=>{
  setIsLoading(false);
  setHttpError(error.message);
});
  },[]);


  if(isLoading){
    return <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
  }
  //we check for http error now

  if(httpError){
    return <section className={classes.mealsError}>
      <p>Error!!!!!</p>
    </section>
  }
  
  const mealsList = meals.map((meal) => (
    <MealItem
    //we have to set the id prop here since it is used in the context file 
    //and also it is needed in the mealitem file
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
