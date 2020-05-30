import { Action, AnyAction } from 'redux'
import * as constants from './constants'

export type LoginSubmitPayload = { email : string, password: string }
export type LoginSuccessPayload = { token : string }
export type LoginFailurePayload = { errors : string }
export type SignupSuccessPayload = { token : string }
export type SignupFailurePayload = { errors : SignupErrors }

export type LoginPayload = LoginSubmitPayload | LoginSuccessPayload

export interface SignupFormState {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  country: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface LoginSuccessAction{
  type: typeof constants.LOGIN_SUCCESS;
  payload: LoginSuccessPayload
}
export interface LoginSubmitAction {
  type: typeof constants.LOGIN_SUBMIT;
  payload: LoginSubmitPayload
}
export interface LoginFailureAction {
  type: typeof constants.LOGIN_FAILURE;
  payload: LoginFailurePayload
}
export interface LogoutSubmitAction {
  type: typeof constants.LOGOUT_SUBMIT
}
export interface SignupSubmitAction {
  type: typeof constants.SIGNUP_SUBMIT;
  payload: SignupFormState;
}
export interface SignupSuccessAction {
  type: typeof constants.SIGNUP_SUCCESS;
  payload: SignupSuccessPayload;
}
export interface SignupFailureAction {
  type: typeof constants.SIGNUP_FAILURE;
  payload: SignupFailurePayload
}

export interface AccountInfo {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  emailVerified: boolean;
  passwordUpdatedAt: number;
  providerUserInfo: [
    {
      providerId: string;
      displayName: string;
      photoUrl: string;
      federatedId: number;
      email: string;
      rawId: number;
    }
  ];
  validSince: string;
  lastLoginAt: string;
  createdAt: string;
  lastRefreshAt: string;
}

export type SignupFields = 
  | "firstName" 
  | "lastName" 
  | "email" 
  | "username" 
  | "country" 
  | "phoneNumber" 
  | "password" 
  | "confirmPassword" 

export type SignupErrors = {
  [field in SignupFields]?: string
}
export interface LoginState {
  email: string | null;
  token: string | null;
  account: AccountInfo | null;
  signup_errors: SignupErrors | null;
}

export type LoginAction = 
  | LoginSubmitAction 
  | LoginSuccessAction 
  | LogoutSubmitAction
  | LoginFailureAction
  | SignupSubmitAction
  | SignupSuccessAction
  | SignupFailureAction
  | AnyAction

