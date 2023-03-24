import { takeLatest, put, all, call } from 'redux-saga/effects';

import { checkUserSession,
  emailSignInStart,
  googleSignInStart,
  signOut, 
  signInSuccess, 
  signInFailed, 
  signOutFailed,
  signUpWithEmailAndPasswordStart, 
  signUpWithEmailSuccessAction, 
  signUpWithEmailFailedAction } from './user.reducer';

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
  yield takeLatest(checkUserSession.type, isUserAuthenticated)
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
  yield takeLatest(emailSignInStart.type, signInAuthUserWithEmailPasswordAsync);
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
  yield takeLatest(googleSignInStart.type, signInWithGoogleAsync);
}

export function* signOutUserAsync() {
  // console.log('onSignOut taken'); - this code WILL BE called. Why below why commented code is not called?
  yield call(signOutUser);
}

export function* onSignOut() {
  // console.log('onSignOut taken'); - this code will NOT be called. Why?
  try {
    yield takeLatest(signOut.type, signOutUserAsync);
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
    case "auth/popup-closed-by-user":
      alert("Sign-in pop-up closed by user.")
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
    yield put(signUpWithEmailSuccessAction({user, additionalDetails: {displayName}}));
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
  yield takeLatest(signUpWithEmailSuccessAction.type, signUpWithEmailSuccess);
}

export function* onSignUpWithEmail() {
  yield takeLatest(signUpWithEmailAndPasswordStart.type, signUpWithEmailAsync);
}

export function* onSignUpWithEmailFailed() {
  yield takeLatest(signUpWithEmailFailedAction.type, signUpWithEmailFailed);
}

export function* onSignInFailed() {
  yield takeLatest(signInFailed.type, signInFailedHandler);
}

export function* onSignOutFailed() {
  yield takeLatest(signOutFailed.type, signOutFailedHandler);
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