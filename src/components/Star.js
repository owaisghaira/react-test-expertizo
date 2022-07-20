import React from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const Star = ({ difficulty }) => {
  //hard
  const diff = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  return (
    <>
      {[1, 2, 3].map((_, i) => {
        if (i + 1 <= diff[difficulty]) return <StarFilled key={i} />;
        return <StarOutlined key={i} />;
      })}
    </>
  );
};

export default Star;
