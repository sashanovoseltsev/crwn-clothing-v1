import { useSelector } from 'react-redux';

import SignUp from "../sign-up-form/sign-up-form.component";
import SignIn from "../sign-in-form/sign-in-form.component";

import { AuthenticationContainer } from "./authentication.styles";

import Spinner from '../spinner/spinner.component';
import { selectUserIsLoading } from '../../store/user/user.selectors';

const Authentication = () => {
  const isUserLoading = useSelector(selectUserIsLoading);
  return (
    <AuthenticationContainer>
      {
        isUserLoading 
          ? <Spinner />
          :<>
          <SignIn />
          <SignUp />
          </> 
      }

    </AuthenticationContainer>
  );
};

export default Authentication;
