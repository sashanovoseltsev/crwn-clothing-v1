import { FC, ButtonHTMLAttributes } from 'react';

import {
  BaseButton,
  GoogleSigninButton,
  InvertedButton,
  DisabledButton,
  ButtonSpinner
} from "./button.styles";

export enum BUTTON_TYPES {
  base = "base",
  google = "google",
  inverted = "inverted",
  disabled = "disabled"
};

export type ButtonProps = {
  buttonType?: BUTTON_TYPES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getButton = (type = BUTTON_TYPES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.google]: GoogleSigninButton,
    [BUTTON_TYPES.inverted]: InvertedButton,
    [BUTTON_TYPES.disabled]: DisabledButton
  }[type]);

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(isLoading ? BUTTON_TYPES.disabled : buttonType);
  return <CustomButton disabled={isLoading} {...otherProps}>
    { isLoading 
      ? <ButtonSpinner /> 
      : children }
    </CustomButton>;
};

export default Button;
