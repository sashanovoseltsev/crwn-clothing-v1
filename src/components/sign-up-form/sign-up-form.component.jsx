import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer } from "./sign-up-form.styles.jsx";

import Spinner from '../spinner/spinner.component';

import { signUpWithEmailAndPasswordStart } from '../../store/user/user.action';
import { selectUserIsLoading } from '../../store/user/user.selectors';

const defaultFormState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(defaultFormState);
  const isLoading = useSelector(selectUserIsLoading);

  const { displayName, email, password, confirmPassword } = formState;

  const resetFormFields = () => {
    setFormState(defaultFormState);
  };

  const handleFormSubmitted = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("passwords do not match");
      alert("passwords do not match");

      return;
    }

    dispatch(signUpWithEmailAndPasswordStart(email, password, displayName));
    resetFormFields();
  };

  const handleValueChanged = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
    //console.log(formState);
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign Up with email and password</span>
      <form onSubmit={handleFormSubmitted}>
        <FormInput
          id="dname"
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleValueChanged}
          required
        />

        <FormInput
          label="Email"
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleValueChanged}
          required
        />

        <FormInput
          id="pswrd"
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleValueChanged}
          required
        />

        <FormInput
          id="cnfrmpswrd"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleValueChanged}
          required
        />
        <Button buttonType="base" type="submit">
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
