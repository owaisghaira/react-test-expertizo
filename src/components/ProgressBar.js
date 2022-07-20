import React from "react";
import styled from "styled-components";

const ProgressBar = ({ minimumScore, maximumScore, userProgress }) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <p>Score {userProgress}%</p>
        <p>Max Score {maximumScore}%</p>
      </div>
      <ProgressBarContainer>
        <FillerProgressBar
          style={{
            background: `
            linear-gradient(
                to right, 
                #000 ${minimumScore}%, 
                #717171 ${minimumScore}%, 
                #717171 ${userProgress}%,
                #D2D2D2 ${userProgress}%,
                #D2D2D2 ${maximumScore}% ,
                #FFFFFF 0)`,
          }}
        />
      </ProgressBarContainer>
    </>
  );
};

export default ProgressBar;

const FillerProgressBar = styled.div`
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #333;
  height: 20px;
`;
