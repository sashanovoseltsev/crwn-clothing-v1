import styled from "styled-components";

import { SpinnerContainer } from '../spinner/spinner.styles';

export const BaseButton = styled.button`
  &,
  &:link,
  &:hover {
    min-width: 16.5rem;
    width: auto;
    height: 5rem;
    letter-spacing: 0.5px;
    line-height: 5rem;
    padding: 0 3.5rem 0 3.5rem;
    font-size: 1.5rem;
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
    align-items: center;
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

export const DisabledButton = styled(BaseButton)`
  &,
  &:link,
  &:visited {
    background-color: white;
    color: #333;
    border: 1px solid #333;
    cursor: none;
  }

  &:hover,
  &:active {
    background-color: white;
    color: #333;
    border: 1px solid #333;
  }
`;

export const ButtonSpinner = styled(SpinnerContainer)`
  width: 3rem;
  height: 3rem;
`;
