import styled from "styled-components";
import { colors } from "../constants";

export const Button = styled.button`
  text-transform: uppercase;
  background: ${(props) =>
    props.secondary ? colors.secondaryAction : colors.mainAction};
  color: ${(props) =>
    props.secondary ? colors.secondaryButtonText : colors.mainButtonText};
  font-size: 0.7em;
  font-weight: 600;
  text-transform: uppercase;
  font-family: Questrial,sans-serif;
  font-weight: 400;
  margin: 1em;
  padding: 1em;
  border: 0px;
  border-radius: 3px;
  cursor: pointer;
  :hover {
    // background: ${(props) => (props.secondary ? "white" : "palevioletred")};
    // color: ${(props) => (props.secondary ? "palevioletred" : "white")};
  }
`;
