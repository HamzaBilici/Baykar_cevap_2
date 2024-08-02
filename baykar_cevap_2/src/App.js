import './style/App.css';
import React, { useState, useEffect } from 'react';
import AnswerButton from './components/answerButtons.js';
import Timer from './components/timer.js';
import ResultRow from './components/resultRow.js';

function App() {
  const timerStartTime = 30;
  const [timerSpeed, setTimerSpeed] = useState(1000);
  const [dataJson, setDataJson] = useState([]);
  const [timer, setTimer] = useState(timerStartTime);
  const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
  const [isButtonsActive, setIsButtonsActive] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState([]);
  const [isItEnded, setIsItEnd] = useState(false);




  const resetTimer = () => {
    setIsButtonsActive(false);
    setTimer(timerStartTime);
    setCurrentQuestionCount(currentQuestionCount + 1);
    if (currentQuestionCount >= 10) {
      setIsItEnd(true);
    }
    if (currentQuestionCount >= 9) {
      setTimerSpeed(0);
    }
      
    
    console.log(selectedAnswerId);
  }
  const activateButtons = () => {
    setIsButtonsActive(true);
  }
  const decreaseTimer = () => {
    if (questions.length <= 0 && answers.length <= 0) prepareQuestions();
    /* console.log(questions);
     console.log(answers);*/
    //console.log(dataJson);
    // console.log(answers)
    setTimer(timer - 1)
    if (timer <= 20) {
      activateButtons();
    }
    if (timer <= 0) {

      answerClick(-1);
      resetTimer();

    }

  }

  const answerClick = (e) => {
    setSelectedAnswerId(oldArray => [...oldArray, e]);
    console.log(e)
    resetTimer()
  }

  const prepareQuestions = () => {

    if (questions.length <= 0 && answers.length <= 0){
    dataJson.map((item) => {
      setQuestions(oldArray => [...oldArray, item?.body]);
      setAnswers(oldArray => [...oldArray, [...item?.body.split('\n')]]);
      if (questions.length > 10 && answers.length > 0){
        return;
      } 
    })
    /* console.log(questions);
     console.log(answers);*/


  }}

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/?_limit=10')
      .then(response => response.json())
      .then(data => setDataJson(data));
    prepareQuestions();
    /* console.log({ dataJson })*/
  }, []);



  const renderedItems = answers[currentQuestionCount]?.map((item, index) => {
    return (
      <AnswerButton clickEvent={answerClick} key={index} selectedID={answers[currentQuestionCount].indexOf(item)} isActive={isButtonsActive} content={item} />
    );
  });

  const renderedResults= questions?.map((item, index) => {
    
    
    return (
      <ResultRow selectedOption={selectedAnswerId[index]} options={answers[index]} key={index} question={item} />
    );
  });



  return (
    <>
      {!isItEnded && <div className="App">
        <Timer activateButtons={activateButtons} timerSpeed={timerSpeed} resetFunction={resetTimer} time={timer} setTime={decreaseTimer} />
        <div className='questionArea'>
          {questions[currentQuestionCount]}
        </div>
        <div className='answerArea'>

          {renderedItems}

        </div>
      </div>}

      {isItEnded && <div className="App App-result">
        <div className='result-container'>
        {renderedResults}
        </div>
      </div>}

    </>
  );
}

export default App;
