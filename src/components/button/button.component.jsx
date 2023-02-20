import {
  BaseButton,
  GoogleSigninButton,
  InvertedButton,
} from "./button.styles.jsx";

export const BUTTON_TYPES = {
  base: "base",
  google: "google",
  inverted: "inverted",
};

const getButton = (type = BUTTON_TYPES.base) =>
  ({
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.google]: GoogleSigninButton,
    [BUTTON_TYPES.inverted]: InvertedButton,
  }[type]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  console.log(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
