import styled from "styled-components";

export const BaseButton = styled.button`
  &,
  &:link,
  &:hover {
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    background-color: #333;
    border: 1px solid white;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    font-family: "Open Sans";
    font-weight: lighter;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition: all 0.2s;
  }

  &:hover {
    background-color: white;
    color: #333;
    border: 1px solid #333;
  }
`;

export const GoogleSigninButton = styled(BaseButton)`
  &,
  &:link,
  &:visited {
    background-color: #4285f4;
    color: white;
    border: 1px solid #4285f4;
  }

  &:hover,
  &:active {
    background-color: #357ae8;
    border: 1px solid #357ae8;
  }
`;

export const InvertedButton = styled(BaseButton)`
  &,
  &:link,
  &:visited {
    background-color: white;
    color: #333;
    border: 1px solid #333;
  }

  &:hover,
  &:active {
    background-color: #333;
    color: white;
    border: 1px solid #333;
  }
`;
