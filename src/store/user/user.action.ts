import { UserInfo, USER_ACTION_TYPES } from './user.types';
import { ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';
import { AdditionalInfo } from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

export type SignInEmailStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>;
export type SignInEmailSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_EMAIL_SUCCESS, {user: User, additionalDetails: AdditionalInfo}>;
export type SignUpEmailStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_EMAIL_START, { email: string; password: string; displayName: string }>;
export type SignUpEmailSucess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_EMAIL_SUCCESS, {user: User, additionalDetails: AdditionalInfo}>;
export type AuthenticationError = ActionWithPayload<USER_ACTION_TYPES.AUTHENTICATION_ERROR, Error & {code: string}>;


export const checkUserSession = withMatcher(() => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export const googleSignInStart = withMatcher(() => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password}));

export const signInSuccess = withMatcher((user: UserInfo & {id: string}) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));


export const signOut = withMatcher(() => createAction(USER_ACTION_TYPES.SIGN_OUT));

export const authenticationError = withMatcher((error: Error) => createAction(USER_ACTION_TYPES.AUTHENTICATION_ERROR, error));

export const signUpWithEmailAndPasswordStart = withMatcher((email: string, password: string, displayName: string) => createAction(USER_ACTION_TYPES.SIGN_UP_EMAIL_START, {email, password, displayName}));

export const signUpWithEmailSuccessAction = withMatcher((user: User, additionalDetails: AdditionalInfo) => createAction(USER_ACTION_TYPES.SIGN_UP_EMAIL_SUCCESS, { user, additionalDetails }));
