import React, { useState } from "react";
import styled from "styled-components";
import QuestionCard from "./Components/QuestionCard";
import Logo from "./images/Expertizo-logo.png";
import QuizData from "./questions.json";

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

function App() {
  const [quizData, setQuizData] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [userAnswer, setUserAnswer] = useState([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [check, setcheck] = useState(true);

  const TotalQuestions = QuizData.length;

  const AppWrapper = styled.section`
    .wrap {
      max-width: 600px;
      min-width: 200px;
      max-height: 600px;
      margin: 0 auto;
      // text-align: center;
      padding: 100px;
      border: solid 1px gray;
      margin-top: 40px;
      box-shadow: 10px 5px 10px gray;
      padding: 20px;
    }
    .image-logo {
      width: 100%;
    }
  `;

  const shuffleAnswer = () => {
    return QuizData.map((question) => ({
      ...question,
      answer: shuffle([...question.incorrect_answers, question.correct_answer]),
    }));
  };

  const getStarted = () => {
    const newData = shuffleAnswer();
    setGameOver(false);
    setQuizData(newData);
    setUserAnswer([]);
    setNumber(0);
  };

  const nextQuestion = () => {
    const nextQ = number + 1;

    if (nextQ === TotalQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  const checkAnswer = (e) => {
    if (!gameOver) {
      const answer = e.target.innerHTML;
      const correct = quizData[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
        setcheck(true);
      } else {
        setcheck(false);
      }

      const answerObject = {
        question: quizData[number].question,
        answer,
        correct,
        correctAnswer: quizData[number].correct_answer,
      };
      setUserAnswer((p) => [...p, answerObject]);
    }
  };

  const progress = () => {
    let percent = ((number + 1) * 100) / TotalQuestions;
    return percent;
  };
  const userProgress = () => {
    let percent = (score / (number + 1)) * 100;
    console.log("current score", score, number + 1);
    console.log("current score", percent);
    return Math.round(percent);
  };
  const userallCorrect = () => {
    // let percent = TotalQuestions - number + score;
    // console.log("==", percent, number);
    // percent = (percent / TotalQuestions) * 100;
    let percent = TotalQuestions - (number + 1);
    percent = percent + score;
    percent = (percent / TotalQuestions) * 100;
    return percent;
  };
  const userallIncorect = () => {
    let percent = ((TotalQuestions - score) / TotalQuestions) * 100;
    return percent;
  };

  return (
    <AppWrapper>
      <div className="wrap">
        {!gameOver && (
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress()}%` }}
              aria-valuenow={100}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}
        {gameOver && (
          <div className="text-center">
            <img className="image-logo" src={Logo} alt="logo" />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={getStarted}
            >
              Start Quiz
            </button>
          </div>
        )}
        {!gameOver && (
          <>
            <QuestionCard
              questionNr={number + 1}
              totalQues={TotalQuestions}
              question={quizData[number].question}
              answers={quizData[number].answer}
              callback={checkAnswer}
              userAns={userAnswer ? userAnswer[number] : undefined}
              category={quizData[number].category}
            />
          </>
        )}
        {!gameOver &&
        userAnswer.length === number + 1 &&
        number !== TotalQuestions - 1 ? (
          <div className="text-center">
            <h3>{check ? " Correct" : "Sorry!"}</h3>
            <button
              className="answerButton btn col-md-5"
              onClick={nextQuestion}
            >
              Next Question
            </button>
          </div>
        ) : null}
        {!gameOver && (
          <>
            <div>
              <p>Incorrect:{userallIncorect()}%</p>
              <p>Score:{userProgress()}%</p>
              <p>Max Score:{userallCorrect()}%</p>
              {/* <p>Max:{}%</p> */}
            </div>
            <div className="progress mt-3">
              <div
                className="progress-bar bg-dark"
                role="progressbar"
                style={{ width: `${userallIncorect()}%` }}
                aria-valuenow={15}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <div
                className="progress-bar bg-secondary "
                role="progressbar"
                style={{ width: `${userProgress()}%` }}
                aria-valuenow={30}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <div
                className="progress-bar bg-info"
                role="progressbar"
                style={{ width: `${userallCorrect()}%` }}
                aria-valuenow={20}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </>
        )}
      </div>
    </AppWrapper>
  );
}

export default App;
