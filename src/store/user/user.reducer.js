import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.error = null;
    },
    checkUserSession(state, _) {
      state.error = null;
    },
    googleSignInStart(state, _) {
      state.isLoading = true;
      state.error = null;
    },
    emailSignInStart(state, _) {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    } ,
    signInFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    signOut(state, _) {
      state.currentUser = null;
      state.error = null;
    },
    signOutFailed(state, action) {
      state.error = action.payload;
    },
    signUpWithEmailAndPasswordStart(state, _) {
      state.isLoading = true;
      state.error = null;
    },
    signUpWithEmailSuccessAction(state, action) {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    signUpWithEmailFailedAction(state, action, error) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const userReducer = userSlice.reducer;
export const {setCurrentUser,
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
  signOut,
  signOutFailed,
  signUpWithEmailAndPasswordStart,
  signUpWithEmailSuccessAction,
  signUpWithEmailFailedAction } = userSlice.actions;