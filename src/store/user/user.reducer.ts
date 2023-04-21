import { AnyAction } from 'redux';
import { authenticationError, 
  emailSignInStart, 
  googleSignInStart, 
  signInSuccess, 
  signOut, 
  signUpWithEmailAndPasswordStart, 
  signUpWithEmailSuccessAction } from './user.action';
import { UserState, } from './user.types';

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userReducer = (
  state = INITIAL_STATE, 
  action: AnyAction): UserState => {

  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false
    };
  }

  if (authenticationError.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false
    }
  }

  if (googleSignInStart.match(action) ||
      emailSignInStart.match(action) ||
      signUpWithEmailAndPasswordStart.match(action)) {
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }

  if (signUpWithEmailSuccessAction.match(action)) {
    return {
      ...state,
      isLoading: false,
      error: null,
    }
  }

  if (signOut.match(action)) {
    return {
      ...state,
      currentUser: null,
      error: null,
    }
  }

  return state;
}