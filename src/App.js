import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import Logo from "./images/Expertizo-logo.png";
import QuizData from "./questions.json";
import { Button } from "./styles/QuestionCard";
import { AppWrapper } from "./styles/HomeStyle";
import ProgressBar from "./components/ProgressBar";

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

function App() {
  const [quizData, setQuizData] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [showNextQ, setNextQ] = useState(false);
  const [userAnswer, setUserAnswer] = useState(0);
  const [currentQues, setCurrentQues] = useState(0);
  const [userProgress, setUserProgress] = useState(0);
  const [maxScore, setMaxScore] = useState(100);
  const [minScore, setMinScore] = useState(0);
  const [score, setScore] = useState(0);
  const [noScore, setNoScore] = useState(0);
  const [check, setCheck] = useState(true);

  const totalQuestions = QuizData.length;

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
    setUserAnswer(0);
    setCurrentQues(0);
  };

  const nextQuestion = () => {
    setNextQ(false);
    const nextQ = currentQues + 1;

    if (nextQ === totalQuestions) {
      setGameOver(true);
    } else {
      setCurrentQues(nextQ);
    }
  };

  const checkAnswer = (e) => {
    setNextQ(true);
    setUserAnswer((num) => num + 1);
    if (!gameOver) {
      const answer = e.target.innerHTML;
      const correct =
        decodeURIComponent(quizData[currentQues].correct_answer) === answer;
      if (correct) {
        setScore((score) => score + 1);
        setCheck(true);
        setMinScore((noScore / totalQuestions) * 100);
        setMaxScore(
          ((score + 1 + (totalQuestions - (currentQues + 1))) /
            totalQuestions) *
            100
        );
        setUserProgress(Math.round(((score + 1) / (currentQues + 1)) * 100));
      } else {
        setCheck(false);
        setNoScore(noScore + 1);
        setMinScore(((noScore) / totalQuestions) * 100);
        setMaxScore(
          ((score - 1 + (totalQuestions - currentQues)) / totalQuestions) * 100
        );
        setUserProgress(Math.round((score / (currentQues + 1)) * 100));
      }
    }
  };

  const progressBar = () => {
    let percent = ((currentQues + 1) * 100) / totalQuestions;
    return percent;
  };

  const finalQuiz = () => {
    let result = userProgress >= 60 ? "You Win" : "You Lost";
    alert(result);
    window.location.reload();
  };

  const StartQuiz = () => {
    return (
      <div className="text-center">
        <img width="100%" className="image-logo" src={Logo} alt="logo" />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={getStarted}
        >
          Start Quiz
        </button>
      </div>
    );
  };

  return (
    <AppWrapper>
      {gameOver && StartQuiz()}
      {!gameOver && (
        <QuestionCard
          questionNr={currentQues + 1}
          totalQues={totalQuestions}
          question={quizData[currentQues].question}
          answers={quizData[currentQues].answer}
          checkAnswer={checkAnswer}
          userAns={userAnswer ? userAnswer[currentQues] : undefined}
          category={quizData[currentQues].category}
          difficulty={quizData[currentQues].difficulty}
          progressBar={progressBar}
        />
      )}
      {showNextQ && (
        <div className="text-center">
          <h3>{check ? " Correct" : "Sorry!"}</h3>
          <Button
            className="answerButton btn"
            onClick={totalQuestions === userAnswer ? finalQuiz : nextQuestion}
          >
            {totalQuestions === userAnswer ? "Show Result" : " Next Question"}
          </Button>
        </div>
      )}

      {!gameOver && (
        <ProgressBar
          minimumScore={minScore}
          maximumScore={maxScore}
          userProgress={userProgress}
        />
      )}
    </AppWrapper>
  );
}

export default App;
