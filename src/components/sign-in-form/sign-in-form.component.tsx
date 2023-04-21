import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPES } from "../button/button.component";

import { SignInContainer } from "./sign-in-form.styles";
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';

const defaultFormState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formState, setFormState] = useState(defaultFormState);
  const dispatch = useDispatch();

  const { email, password } = formState;

  const resetFormFields = () => {
    setFormState(defaultFormState);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleFormSubmitted = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return;
    dispatch(emailSignInStart(email, password));
    resetFormFields();
  };

  const handleValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleFormSubmitted}>
        <FormInput
          label="Email"
          id="signin-email"
          type="email"
          name="email"
          value={email}
          onChange={handleValueChanged}
          required
        />

        <FormInput
          label="Password"
          id="signin-pswrd"
          type="password"
          name="password"
          value={password}
          onChange={handleValueChanged}
          required
        />
        <div className="buttons-container">
          <Button type="submit" buttonType={BUTTON_TYPES.base}>
            Sign In
          </Button>
          <Button type="button" buttonType={BUTTON_TYPES.google} onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
