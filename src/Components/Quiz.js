import React, { useState } from 'react';
import { QuizData } from '../Data/QuizData';
import QuizResult from './QuizResult';


function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const changeQuestion = () => {
    updateScore();
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QuizData.length) {
      setCurrentQuestion(nextQuestion);
      setClickedOption(null); // Reset clicked option for the next question
    } else {
      setShowResult(true);
    }
  };

  const updateScore = () => {
    if (clickedOption === QuizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const resetQuiz = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(null);
    setScore(0);
  };

  return (
    <div>
      <p className="heading-txt">Quiz App</p>
      <div className="container">
        {showResult ? (
          <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetQuiz} />
        ) : (
          <>
            <div className="question">
              <span id="question-number">{currentQuestion + 1}. </span>
              <span id="question-txt">{QuizData[currentQuestion].question}</span>
            </div>
            <div className="option-container">
              {QuizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${clickedOption === index + 1 ? 'checked' : ''}`}
                  onClick={() => setClickedOption(index + 1)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button onClick={changeQuestion} disabled={clickedOption === null} id="next-button">
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;

