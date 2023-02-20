import styled from "styled-components";
import { css } from "styled-components";

import { BaseButton } from "../button/button.styles";

export const CartDropDownContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 440px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  visibility: visible;
  opacity: 100;
  transition: all 0.2s;

  .empty-message {
    font-size: 18px;
    margin: 50px auto;
  }

  .cart-items {
    height: 340px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }

  ${BaseButton} {
    margin-top: auto;
    text-align: center;
  }

  ${(props) =>
    !props.isOpened &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
`;
