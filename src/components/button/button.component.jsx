import {
  BaseButton,
  GoogleSigninButton,
  InvertedButton,
  DisabledButton,
  ButtonSpinner
} from "./button.styles.jsx";

export const BUTTON_TYPES = {
  base: "base",
  google: "google",
  inverted: "inverted",
  disabled: "disabled"
};

const getButton = (type = BUTTON_TYPES.base) =>
  ({
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.google]: GoogleSigninButton,
    [BUTTON_TYPES.inverted]: InvertedButton,
    [BUTTON_TYPES.disabled]: DisabledButton
  }[type]);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(isLoading ? BUTTON_TYPES.disabled : buttonType);
  return <CustomButton disabled={isLoading} {...otherProps}>
    { isLoading 
      ? <ButtonSpinner /> 
      : children }
    </CustomButton>;
};

export default Button;
