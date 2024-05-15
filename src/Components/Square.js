import React, { useEffect } from 'react';
import "./Square.css";

const Square = (props) => {
    useEffect(()=>{
     console.log('square박스');   
    },[props.value])
    
    return (
        <button 
        className="square"
        onClick={()=>{props.onClick()}}
        >{props.value}</button>
    );
}

export default Square;