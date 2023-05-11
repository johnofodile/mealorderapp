import classes from './Input.module.css';


import React from 'react';






//we need the ref here so first we import react from react then use the ref on line 14 of the code. 
//The ref is also passed as a parameter on line 14 of the code


const Input=React.forwardRef((props,ref)=>{
    return (
        <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input}/>

        </div>

    )
}
);
export default Input;