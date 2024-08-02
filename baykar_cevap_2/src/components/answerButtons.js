import React, { useState, useEffect } from 'react';

const AnswerButtons = (props) => {
    return (

        <button  className='answerButtons' disabled={!props.isActive}  onClick={ (e)=>props.clickEvent(props.selectedID)} >
            {props.content}
        </button>
    );

}
export default AnswerButtons;