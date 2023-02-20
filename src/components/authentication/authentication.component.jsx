import SignUp from "../sign-up-form/sign-up-form.component";
import SignIn from "../sign-in-form/sign-in-form.component";

import { AuthenticationContainer } from "./authentication.styles.jsx";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignIn />
      <SignUp />
    </AuthenticationContainer>
  );
};

export default Authentication;
