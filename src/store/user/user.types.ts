export const enum USER_ACTION_TYPES {
  CHECK_USER_SESSION = 'user/CHECK_USER_SESSION',
  GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START',
  SIGN_UP_EMAIL_START = 'user/SIGN_UP_EMAIL_START',
  SIGN_UP_EMAIL_SUCCESS = 'user/SIGN_UP_EMAIL_SUCCESS',
  SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
  SIGN_OUT = 'user/SIGN_OUT',
  AUTHENTICATION_ERROR = 'user/AUTHENTICATION_ERROR'
}


export type UserDbEntry = {
  readonly displayName: string;
  readonly email: string;
  readonly createdAt?: Date;
}

export type UserInfo = UserDbEntry & {
  readonly id: string;
}

export type UserState = {
  currentUser: UserInfo | null;
  isLoading: boolean;
  error: Error | null;
}