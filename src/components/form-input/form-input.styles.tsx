import styled from "styled-components";
import { css } from "styled-components";

const color = {
  sub: "grey",
  main: "black",
};

const shrinkLabel = css`
  top: -1.4rem;
  font-size: 1.2rem;
  color: $main-color;
`;

type FormInputLabelProps = {
  shrink?: boolean;
}

export const Label = styled.label<FormInputLabelProps>`
  color: ${color.sub};
  font-size: 1.6rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0.5rem;
  top: 1rem;
  transition: 300ms ease all;

  ${(props) => props.shrink && shrinkLabel}
`;

export const FormGroupContainer = styled.div`
  position: relative;
  margin: 4.5rem 0;

  .form-input {
    background: none;
    background-color: white;
    color: ${color.sub};
    font-size: 1.8rem;
    padding: 1rem 1rem 1rem 0.5rem;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 0.1rem solid ${color.sub};
    margin: 2.5rem 0;

    &:focus {
      outline: none;
    }

    &:focus + ${Label} {
      ${shrinkLabel}
    }
  }

  input[type="password"] {
    letter-spacing: 0.3em;
  }
`;
