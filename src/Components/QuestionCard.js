import React from "react";
import styled from "styled-components";

const QuestionCard = ({
  question,
  answers,
  callback,
  userAns,
  questionNr,
  totalQues,
  category,
}) => {
  const CardWrapper = styled.section`
    .wrapper {
      padding: 50px;
    }
    .answerButton {
      color: black;
      font-size: 1em;
      //   padding: 0.1em 2em;
      border: 1px solid black;
      border-radius: 5px;
      margin: 10px;
      cursor: "pointer";
    }
  `;
  return (
    <CardWrapper>
      <div>
        <div style={{ padding: "40px" }}>
          <h1 className="h1">Question {questionNr} Of 20</h1>
          <p>{category}</p>
          <p className="">Q:{question}</p>
          {/* <p className="">Q :dustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> */}

          <div class="row mt-3">
            {answers.map((ans, i) => (
              <div className=" col-md-6">
                <button
                  className="answerButton btn"
                  disabled={userAns ? true : false}
                  onClick={callback}
                >
                  <span dangerouslySetInnerHTML={{ __html: ans }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default QuestionCard;
