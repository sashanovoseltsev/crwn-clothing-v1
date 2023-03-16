import { USER_ACTION_TYPES } from './user.types';

export const setCurrentUser = (user) => {
  return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user };
}

export const checkUserSession = () => { 
  return { type: USER_ACTION_TYPES.CHECK_USER_SESSION };
}

export const googleSignInStart = () => { 
  return { type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START };
}

export const emailSignInStart = (email, password) => { 
  return { type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START, payload: {email, password} };
}

export const signInSuccess = (user) => { 
  return { type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: user };
}

export const signInFailed = (error) => { 
  return { type: USER_ACTION_TYPES.SIGN_IN_FAILED, payload: error };
}

export const signOut = () => {
  return { type: USER_ACTION_TYPES.SIGN_OUT }
}

export const signOutFailed = (error) => {
  return { type: USER_ACTION_TYPES.SIGN_OUT_FAILED, payload: error };
}

export const signUpWithEmailAndPasswordStart = (email, password, displayName) => {
  return { type: USER_ACTION_TYPES.SIGN_UP_EMAIL_START, payload: {email, password, displayName} }
}

export const signUpWithEmailSuccessAction = (user, additionalDetails) => {
  return { type: USER_ACTION_TYPES.SIGN_UP_EMAIL_SUCCESS, payload: { user, additionalDetails } };
}

export const signUpWithEmailFailedAction = (error) => {
  return { type: USER_ACTION_TYPES.SIGN_UP_EMAIL_FAILED, payload: error }; 
}