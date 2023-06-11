import { USER_INITIAL_STATE, 
  userReducer } from '../user.reducer';

import {
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signOut,
  authenticationError,
  signUpWithEmailAndPasswordStart,
  signUpWithEmailSuccessAction } from '../user.action';

  describe('userReducer tests', () => {
    test('signInSuccess', () => {
      const mockedUser = {
        displayName: "sanov",
        email: "sanov@email.com",
        createdAt: new Date(),
        id: 1
      };
      const expectedState = {
        ...USER_INITIAL_STATE,
        currentUser: mockedUser,
        isLoading: false
      };

      expect(userReducer(USER_INITIAL_STATE, signInSuccess(mockedUser))).toEqual(expectedState);
    });

    test('authenticationError', () => {
      const mockedError = new Error('test failure');
      const expectedState = {
        ...USER_INITIAL_STATE,
        error: mockedError,
        isLoading: false
      };

      expect(userReducer(USER_INITIAL_STATE, authenticationError(mockedError))).toEqual(expectedState);
    });

    test('signInStart (all 3 cases: google, email, signup)', () => {
      const expectedState = {
        ...USER_INITIAL_STATE,
        isLoading: true
      };

      expect(userReducer(USER_INITIAL_STATE, googleSignInStart())).toEqual(expectedState);
      expect(userReducer(USER_INITIAL_STATE, emailSignInStart())).toEqual(expectedState);
      expect(userReducer(USER_INITIAL_STATE, signUpWithEmailAndPasswordStart())).toEqual(expectedState);
    });

    test('signUpWithEmailSuccessAction', () => {
      const expectedState = {
        ...USER_INITIAL_STATE,
        isLoading: false
      };

      expect(userReducer(USER_INITIAL_STATE, signUpWithEmailSuccessAction({user: {}, additionalInfo: { displayName: 'sanov'} }))).toEqual(expectedState);
    });

    test('signUpWithEmailSuccessAction', () => {
      const expectedState = {
        ...USER_INITIAL_STATE,
        isLoading: false
      };

      expect(userReducer({ ...USER_INITIAL_STATE, currentUser: {} } , signOut())).toEqual(expectedState);
    });
  })