import { takeLatest, put, all, call, take } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed, signOutFailed, signUpWithEmailSuccessAction, signUpWithEmailFailedAction } from './user.action';
import { getCurrentUser, 
  createUserDocumentFromAuth, 
  signInWithGooglePopup, 
  signInAuthUserWithEmailAndPassword, 
  signOutUser, 
  createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';


export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signInAuthUserWithEmailPasswordAsync({ payload: { email, password}}) {
  try {
    const authUser = yield call(signInAuthUserWithEmailAndPassword, email, password);
    const userSnapshot = yield call(createUserDocumentFromAuth, authUser.user);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onSignInWithEmailAndPassword() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInAuthUserWithEmailPasswordAsync);
}

export function* signInWithGoogleAsync() {

  try {
    const authUser = yield call(signInWithGooglePopup);
    const userSnapshot = yield call(createUserDocumentFromAuth, authUser.user);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onSignInWithGoogle() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogleAsync);
}

export function* signOutUserAsync() {
  // console.log('onSignOut taken'); - this code WILL BE called. Why below why commented code is not called?
  yield call(signOutUser);
}

export function* onSignOut() {
  // console.log('onSignOut taken'); - this code will NOT be called. Why?
  try {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT, signOutUserAsync);
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* signInFailedHandler({ payload: error }) {
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
      alert(error.code);
      break;
  }
  console.error(error);
}

export function* signOutFailedHandler({ payload: error }) {
  alert('SignOut failed with error: ', error);
  console.error(error);
}

export function* signUpWithEmailAsync({ payload: { email, password, displayName}}) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield put(signUpWithEmailSuccessAction(user, {displayName}));
  } catch (error) {
    yield put(signUpWithEmailFailedAction(error));
  }
}

export function* signUpWithEmailSuccess({ payload: {user, additionalDetails}}) {
    try {
      const userSnapshot = yield call(createUserDocumentFromAuth, user, additionalDetails);
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
      yield put(signInFailed(error));
    }

}

export function* signUpWithEmailFailed(action) {
  yield call(signInFailedHandler, action);
}

export function* onSignUpWithEmailSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_EMAIL_SUCCESS, signUpWithEmailSuccess);
}

export function* onSignUpWithEmail() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_EMAIL_START, signUpWithEmailAsync);
}

export function* onSignUpWithEmailFailed() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_EMAIL_FAILED, signUpWithEmailFailed);
}

export function* onSignInFailed() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_FAILED, signInFailedHandler);
}

export function* onSignOutFailed() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_FAILED, signOutFailedHandler);
}

export function* userSaga() {
  yield all([call(onCheckUserSession), 
    call(onSignInWithEmailAndPassword), 
    call(onSignInWithGoogle),
    call(onSignInFailed), 
    call(onSignUpWithEmail),
    call(onSignUpWithEmailSuccess),
    call(onSignUpWithEmailFailed),
    call(onSignOut), 
    call(onSignOutFailed)]);
}