import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const defaultFormState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formState, setFormState] = useState(defaultFormState);

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
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      alert("user created successfully!");
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user. Email already in use.");
      } else {
        console.error("user creation encountered an error", error);
        alert(error.code);
      }
    }
  };

  const handleValueChanged = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
    //console.log(formState);
  };

  return (
    <div className="sign-up-container">
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
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
