import styled from "styled-components";

const Button = styled.button`
  color: black;
  font-size: 1em;
  width: 230px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
  cursor: "pointer";

  &:hover {
    color: #fff;
    background: black;
  }
`;

export { Button };
