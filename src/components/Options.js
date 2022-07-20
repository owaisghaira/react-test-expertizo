import React from "react";
import { Button } from "../styles/QuestionCard";

const Options = ({ answers, checkAnswer, userAns }) => {
  return (
    <>
      {answers.map((ans, i) => (
        <div key={i} className=" col-md-6">
          <Button
            className="answerButton btn"
            disabled={userAns ? true : false}
            onClick={checkAnswer}
          > 
            {decodeURIComponent(ans)}
          </Button>
        </div>
      ))}
    </>
  );
};

export default Options;
