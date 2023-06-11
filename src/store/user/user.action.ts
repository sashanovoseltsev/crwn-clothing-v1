import { UserInfo, USER_ACTION_TYPES } from './user.types';
import { Action, ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';
import { AdditionalInfo } from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type SignOut = Action<USER_ACTION_TYPES.SIGN_OUT>;
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, { user: UserInfo }>;
export type SignInEmailStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>;
export type SignInEmailSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_EMAIL_SUCCESS, {user: User, additionalDetails: AdditionalInfo}>;
export type SignUpEmailStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_EMAIL_START, { email: string; password: string; displayName: string }>;
export type SignUpEmailSucess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_EMAIL_SUCCESS, {user: User, additionalDetails: AdditionalInfo}>;
export type AuthenticationError = ActionWithPayload<USER_ACTION_TYPES.AUTHENTICATION_ERROR, { error: Error & {code: string} }>;


export const checkUserSession = withMatcher(() => <CheckUserSession>createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export const googleSignInStart = withMatcher(() => <GoogleSignInStart>createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string) => <SignInEmailStart>createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password}));

export const signInSuccess = withMatcher((user: UserInfo) => <SignInSuccess>createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, { user }));

export const signOut = withMatcher(() => <SignOut>createAction(USER_ACTION_TYPES.SIGN_OUT));

export const authenticationError = withMatcher((error: Error) => <AuthenticationError>createAction(USER_ACTION_TYPES.AUTHENTICATION_ERROR, {error: error}));

export const signUpWithEmailAndPasswordStart = withMatcher((email: string, password: string, displayName: string) => (<SignUpEmailStart>createAction(USER_ACTION_TYPES.SIGN_UP_EMAIL_START, {email, password, displayName})));

export const signUpWithEmailSuccessAction = withMatcher((user: User, additionalDetails: AdditionalInfo) => (<SignUpEmailSucess>createAction(USER_ACTION_TYPES.SIGN_UP_EMAIL_SUCCESS, { user, additionalDetails })));
