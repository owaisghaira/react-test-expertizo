import React from "react";
import Star from "./Star";
import Options from "./Options";
import TopBar from "./TopBar";

const QuestionCard = ({
  question,
  answers,
  checkAnswer,
  userAns,
  questionNr,
  totalQues,
  category,
  progressBar,
  difficulty,
}) => {
  return (
    <>
      <TopBar progressBar={progressBar} />
      <div style={{ padding: "40px" }}>
        <h2>
          Question {questionNr} Of {totalQues}
        </h2>
        <p className="m-0 p-0">Category: {decodeURIComponent(category)}</p>

        <div className="mb-4">
          <Star difficulty={difficulty} />
        </div>

        <p className="">Q : {decodeURIComponent(question)}</p>

        <div className="row mt-3">
          <Options answers={answers} userAns={userAns} checkAnswer={checkAnswer} />
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
