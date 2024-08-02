import React, { useState, useEffect } from 'react';

const ResultRow = (props) => {


  return (
    <div className='result-row'>
        <div>
        {props.question}
        </div>
    
        <div disabled={props.selectedOption!=0}>
        {props.options[0]}
        </div>
        <div disabled={props.selectedOption!=1}>
        {props.options[1]}
        </div>
        <div disabled={props.selectedOption!=2}>
        {props.options[2]}
        </div>
        <div disabled={props.selectedOption!=3}>
        {props.options[3]}
        </div>
    </div>
  );

}
export default ResultRow;