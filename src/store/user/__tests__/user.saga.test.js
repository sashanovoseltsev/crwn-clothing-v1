import { call } from 'typed-redux-saga/macro';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import { isUserAuthenticated,
  onCheckUserSession,
  signInAuthUserWithEmailPasswordAsync,
  onSignInWithEmailAndPassword,
  signInWithGoogleAsync,
  onSignInWithGoogle,
  signOutUserAsync,
  onSignOut,
  authenticationErrorHandler,
  signUpWithEmail,
  signUpWithEmailSuccess,
  onSignUpWithEmailSuccess,
  onSignUpWithEmail,
  onAuthenticationError,
  userSaga } from '../user.saga';

import {
  checkUserSession,
emailSignInStart,
googleSignInStart,
signOut,
signUpWithEmailSuccessAction,
signUpWithEmailAndPasswordStart,
authenticationError,
signInSuccess
} from '../user.action';

import { getCurrentUser, 
  createUserDocumentFromAuth, 
  signInWithGooglePopup, 
  signInAuthUserWithEmailAndPassword, 
  signOutUser, 
  createAuthUserWithEmailAndPassword} from '../../../utils/firebase/firebase.utils';

import { USER_INITIAL_STATE, userReducer } from '../user.reducer';
import { useReducer } from 'react';

describe('User sagas tests', () => {

  test('userSaga', () => {
    testSaga(userSaga)
      .next()
      .all([call(onCheckUserSession), 
        call(onSignInWithEmailAndPassword), 
        call(onSignInWithGoogle),
        call(onSignUpWithEmail),
        call(onSignUpWithEmailSuccess),
        call(onSignOut), 
        call(onAuthenticationError)])
      .next()
      .isDone();
  })

  test('isUserAuthenticated saga success', () => {
    const mockedUserAuth = {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NWUyNDZjNTEwNmExMGQ2MzFiMTA0M2E3MWJi",
      email: "email@email.com"
    };

    const mockedUserSnapshot = {
      id: "xytDuOBKgTS1NutSDtiAD4rig1i1",
      data() {
        return {
          cretedAt: new Date(2023, 5),
          displayName: "sashan4",
          email: "email@email.com"
        }
      }
    };

    const mockedUser = { id: mockedUserSnapshot.id, ...mockedUserSnapshot.data() };

    return expectSaga(isUserAuthenticated)
      .provide([
        [call(getCurrentUser), mockedUserAuth],
        [call(createUserDocumentFromAuth, mockedUserAuth), mockedUserSnapshot]
      ])
      .put(signInSuccess(mockedUser))
      .run();
  });

  test('isUserAuthenticated saga failure', () => {
    const mockedUserAuth = {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NWUyNDZjNTEwNmExMGQ2MzFiMTA0M2E3MWJi",
      email: "email@email.com"
    };

    const mockedError = new Error('test failure');

    return expectSaga(isUserAuthenticated)
      .provide([
        [call(getCurrentUser), mockedUserAuth],
        [call(createUserDocumentFromAuth, mockedUserAuth), throwError(mockedError)]
      ])
      .put(authenticationError(mockedError))
      .run();
  });

  test('isUserAuthenticated saga no user authenticated', () => {
    const mockedUserAuth = null;

    return expectSaga(isUserAuthenticated)
      .provide([
        [call(getCurrentUser), mockedUserAuth]
      ])
      .run();
  });

  test('onCheckUserSession saga', () => {
    testSaga(onCheckUserSession)
      .next()
      .takeLatest(checkUserSession.type, isUserAuthenticated)
      .next()
      .isDone();
  });

  test('onSignInWithEmailAndPassword saga', () => {
    testSaga(onSignInWithEmailAndPassword)
      .next()
      .takeLatest(emailSignInStart.type, signInAuthUserWithEmailPasswordAsync)
      .next()
      .isDone();
  });

  test('onSignInWithGoogle saga', () => {
    testSaga(onSignInWithGoogle)
      .next()
      .takeLatest(googleSignInStart.type, signInWithGoogleAsync)
      .next()
      .isDone();
  });

  test('signOutUserAsync saga', () => {
    testSaga(signOutUserAsync)
      .next()
      .call(signOutUser)
      .next()
      .isDone();
  });

  test('onSignUpWithEmailSuccess saga', () => {
    testSaga(onSignUpWithEmailSuccess)
      .next()
      .takeLatest(signUpWithEmailSuccessAction.type, signUpWithEmailSuccess)
      .next()
      .isDone();
  });

  test('onSignUpWithEmail saga', () => {
    testSaga(onSignUpWithEmail)
      .next()
      .takeLatest(signUpWithEmailAndPasswordStart.type, signUpWithEmail)
      .next()
      .isDone();
  });

  test('onAuthenticationError saga', () => {
    testSaga(onAuthenticationError)
      .next()
      .takeLatest(authenticationError.type, authenticationErrorHandler)
      .next()
      .isDone();
  });

  test('onSignOut success saga', () => {
    testSaga(onSignOut)
    .next()
    .takeLatest(signOut.type, signOutUserAsync)
    .next()
    .isDone();
  })

  test('signInAuthUserWithEmailPasswordAsync success saga', () => {

    const mockedUser = {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NWUyNDZjNTEwNmExMGQ2MzFiMTA0M2E3MWJi",
      email: "email@email.com"
    };

    const mockedUserCredential = {
      user: mockedUser,
      operationType: "sign_in"
    }

    const mockedUserSnapshot = {
      id: "xytDuOBKgTS1NutSDtiAD4rig1i1",
      data() {
        return {
          cretedAt: new Date(2023, 5),
          displayName: "sashan4",
          email: "email@email.com"
        }
      }
    };

    return expectSaga(signInAuthUserWithEmailPasswordAsync, { payload: { email: "email@email.com", password: "123456"}})
      .provide([
        [call(signInAuthUserWithEmailAndPassword, "email@email.com", "123456"), mockedUserCredential],
        [call(createUserDocumentFromAuth, mockedUserCredential.user), mockedUserSnapshot]
      ])
      .put(signInSuccess({ id: mockedUserSnapshot.id, ...mockedUserSnapshot.data()}))
      .run();

  });

  test('signInAuthUserWithEmailPasswordAsync failure saga', () => {

    const mockedUser = {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NWUyNDZjNTEwNmExMGQ2MzFiMTA0M2E3MWJi",
      email: "email@email.com"
    };

    const mockedUserCredential = {
      user: mockedUser,
      operationType: "sign_in"
    }

    const mockedError = new Error('test failure');

    return expectSaga(signInAuthUserWithEmailPasswordAsync, { payload: { email: "email@email.com", password: "123456"}})
      .provide([
        [call(signInAuthUserWithEmailAndPassword, "email@email.com", "123456"), mockedUserCredential],
        [call(createUserDocumentFromAuth, mockedUserCredential.user), throwError(mockedError)]
      ])
      .put(authenticationError(mockedError))
      .run();
  });

  test('signInWithGoogleAsync success saga', () => {

    const mockedUser = {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NWUyNDZjNTEwNmExMGQ2MzFiMTA0M2E3MWJi",
      email: "email@email.com"
    };

    const mockedUserCredential = {
      user: mockedUser,
      operationType: "sign_in"
    }

    const mockedUserSnapshot = {
      id: "xytDuOBKgTS1NutSDtiAD4rig1i1",
      data() {
        return {
          cretedAt: new Date(2023, 5),
          displayName: "sashan4",
          email: "email@email.com"
        }
      }
    };

    return expectSaga(signInWithGoogleAsync)
      .provide([
        [call(signInWithGooglePopup), mockedUserCredential],
        [call(createUserDocumentFromAuth, mockedUserCredential.user), mockedUserSnapshot]
      ])
      .put(signInSuccess({ id: mockedUserSnapshot.id, ...mockedUserSnapshot.data()}))
      .run();
  });

  test('signInWithGoogleAsync failure saga', () => {

    const mockedUser = {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NWUyNDZjNTEwNmExMGQ2MzFiMTA0M2E3MWJi",
      email: "email@email.com"
    };

    const mockedUserCredential = {
      user: mockedUser,
      operationType: "sign_in"
    }

    const mockedError = new Error('test failure');

    return expectSaga(signInWithGoogleAsync)
      .provide([
        [call(signInWithGooglePopup), mockedUserCredential],
        [call(createUserDocumentFromAuth, mockedUserCredential.user), throwError(mockedError)]
      ])
      .put(authenticationError(mockedError))
      .run();
  });

  test('signUpWithEmail success saga', () => {

    const mockedUser = {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NWUyNDZjNTEwNmExMGQ2MzFiMTA0M2E3MWJi",
      email: "email@email.com"
    };

    const mockedUserCredential = {
      user: mockedUser,
      operationType: "sign_in"
    }

    return expectSaga(signUpWithEmail, { payload: { email: "email@email.com", password: "123456", displayName: 'sashan'}})
      .provide([
        [call(createAuthUserWithEmailAndPassword, "email@email.com", "123456"), mockedUserCredential]
      ])
      .put(signUpWithEmailSuccessAction(mockedUserCredential.user, { displayName: 'sashan'}))
      .run();
  });

  test('signUpWithEmail failure saga', () => {

    const mockedError = new Error('test failure');

    return expectSaga(signUpWithEmail, { payload: { email: "email@email.com", password: "123456", displayName: 'sashan'}})
      .provide([
        [call(createAuthUserWithEmailAndPassword, "email@email.com", "123456"), throwError(mockedError)]
      ])
      .put(authenticationError(mockedError))
      .run();
  });

  test('signOutUserAsync success saga', () => {
    return expectSaga(signOutUserAsync)
      .provide([
        [call(signOutUser)]
      ])
      .run();
  })

  test('signOutUserAsync failure saga', () => {
    const mockedError = new Error('test failure');

    return expectSaga(signOutUserAsync)
      .provide([
        [call(signOutUser), throwError(mockedError)]
      ])
      .put(authenticationError(new Error('test failure')))
      .run();
  })

  test('onSignUpWithEmailSuccess saga forks signUpWithEmailSuccess and updates state with current user', () => {
    const mockedEmail = "email@email.com";
    const mockedDisplayName = "sashan4";
    
    const mockedUser = {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NWUyNDZjNTEwNmExMGQ2MzFiMTA0M2E3MWJi",
      email: mockedEmail
    };

    const mockedUserCredential = {
      user: mockedUser,
      operationType: "sign_in"
    }

    const mockedUserSnapshot = {
      id: "xytDuOBKgTS1NutSDtiAD4rig1i1",
      data() {
        return {
          cretedAt: new Date(2023, 5),
          displayName: mockedDisplayName,
          email: mockedEmail
        }
      }
    };

    // TODO: find out if we can test more complext saga relationships when 
    // e.g. one saga forks another via put and that saga handles that action by takeLatest and forks last saga in chain?
    // return expectSaga(signUpWithEmail, { payload: { email: "email@email.com", password: "123456", displayName: 'sashan'}})
    //   .provide([
    //     [call(createAuthUserWithEmailAndPassword, "email@email.com", "123456"), mockedUserCredential],
    //     [call(createUserDocumentFromAuth, mockedUserCredential.user, { displayName: 'sashan'}), mockedUserSnapshot]
    //   ])
    //   .put(signInSuccess({ id: mockedUserSnapshot.id, ...mockedUserSnapshot.data()}))
    //   .dispatch(signUpWithEmailSuccessAction(mockedUserCredential.user, { displayName: 'sashan'}))
    //   .put(signUpWithEmailSuccessAction(mockedUserCredential.user, { displayName: 'sashan'}))
    //   .silentRun();

    const expectedUser = { id: mockedUserSnapshot.id, ...mockedUserSnapshot.data()};

    return expectSaga(onSignUpWithEmailSuccess)
      .withReducer(userReducer)
      .provide([
        [call(createUserDocumentFromAuth, mockedUser, { displayName: mockedDisplayName}), mockedUserSnapshot]
      ])
      .put(signInSuccess(expectedUser))
      .dispatch(signUpWithEmailSuccessAction(mockedUser, { displayName: mockedDisplayName}))
      .hasFinalState({ ...USER_INITIAL_STATE, isLoading: false, currentUser: expectedUser})
      .silentRun();

  });
});
