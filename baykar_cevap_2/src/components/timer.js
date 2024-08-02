import React, { useState, useEffect } from 'react';

const Timer = (props) => {
  // Declare a new state variable, which we'll call "count"
 // const [count, setCount] = useState(0);
 const [timer, setTimer] = useState(props.time);

 useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
        //console.log(props.time)
        props.setTime();
    }, props.timerSpeed);
    
    //Clearing the interval
    return () => clearInterval(interval);
}, );

  return (
    <span className='timer'>
    {props.time}
    </span>
  );

}
export default Timer;