import { takeLatest, put, all, call } from 'typed-redux-saga/macro';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signUpWithEmailSuccessAction, authenticationError, AuthenticationError, SignUpEmailStart, SignUpEmailSucess, SignInEmailStart } from './user.action';
import { getCurrentUser, 
  createUserDocumentFromAuth, 
  signInWithGooglePopup, 
  signInAuthUserWithEmailAndPassword, 
  signOutUser, 
  createAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';


export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth);
    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
    }
  } catch (error) {
    yield* put(authenticationError(error as Error));
  }
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signInAuthUserWithEmailPasswordAsync({ payload: { email, password}}: SignInEmailStart) {
  try {
    const authUser = yield* call(signInAuthUserWithEmailAndPassword, email, password);
    if (authUser) {
      const userSnapshot = yield* call(createUserDocumentFromAuth, authUser.user);
      if (userSnapshot) 
        yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
    }
  } catch (error) {
    yield* put(authenticationError(error as Error));
  }
}

export function* onSignInWithEmailAndPassword() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInAuthUserWithEmailPasswordAsync);
}

export function* signInWithGoogleAsync() {

  try {
    const authUser = yield* call(signInWithGooglePopup);
    const userSnapshot = yield* call(createUserDocumentFromAuth, authUser.user);
    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
    }
  } catch (error) {
    yield* put(authenticationError(error as Error));
  }
}

export function* onSignInWithGoogle() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogleAsync);
}

export function* signOutUserAsync() {
  yield* call(signOutUser);
}

export function* onSignOut() {
  try {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT, signOutUserAsync);
  } catch (error) {
    yield* put(authenticationError(error as Error));
  }
}

export function* authenticationErrorHandler({ payload: error }: AuthenticationError) {
  switch (error.code) {
    case "auth/wrong-password":
      alert("Incorrect credentials.");
      break;
    case "auth/user-not-found":
      alert("Provided email is not registered.");
      break;
    case "auth/email-already-in-use":
      alert("Cannot create user. Email already in use.");
      break;
    default:
      alert(error);
      break;
  }
  console.error(error);
}

export function* signUpWithEmailAsync({ payload: { email, password, displayName}}: SignUpEmailStart) {
  try {
    const userCredetials = yield* call(createAuthUserWithEmailAndPassword, email, password);
    if (userCredetials) {
      const user: User = userCredetials.user;
      yield* put(signUpWithEmailSuccessAction(user, {displayName}));
    }
  } catch (error) {
    yield* put(authenticationError(error as Error));
  }
}

export function* signUpWithEmailSuccess({ payload: {user, additionalDetails}}: SignUpEmailSucess) {
    try {
      const userSnapshot = yield* call(createUserDocumentFromAuth, user, additionalDetails);
      if (userSnapshot) {
        yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
      }
    } catch (error) {
      yield* put(authenticationError(error as Error));
    }
}

export function* onSignUpWithEmailSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_EMAIL_SUCCESS, signUpWithEmailSuccess);
}

export function* onSignUpWithEmail() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_EMAIL_START, signUpWithEmailAsync);
}

export function* onAuthenticationError() {
  yield* takeLatest(USER_ACTION_TYPES.AUTHENTICATION_ERROR, authenticationErrorHandler);
}

export function* userSaga() {
  yield* all([call(onCheckUserSession), 
    call(onSignInWithEmailAndPassword), 
    call(onSignInWithGoogle),
    call(onSignUpWithEmail),
    call(onSignUpWithEmailSuccess),
    call(onSignOut), 
    call(onAuthenticationError)]);
}