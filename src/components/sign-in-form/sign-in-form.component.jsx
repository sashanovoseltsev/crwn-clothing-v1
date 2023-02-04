import { useState } from "react";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formState, setFormState] = useState(defaultFormState);

  const { email, password } = formState;

  const resetFormFields = () => {
    setFormState(defaultFormState);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleFormSubmitted = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
      alert("user signed-in successfully!");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect credentials.");
          break;
        case "auth/user-not-found":
          alert("Provided email is not registered.");
          break;
        default:
          alert(error.code);
          break;
      }
      console.log(error);
    }
  };

  const handleValueChanged = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="sign-in-container">
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
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
