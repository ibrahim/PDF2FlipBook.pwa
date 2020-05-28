import { Action, AnyAction } from 'redux'
import * as constants from './constants'

export type LoginSubmitPayload = { email : string, password: string }
export type LoginSuccessPayload = { token : string }
export type LoginFailurePayload = { errors : string }

export type LoginPayload = LoginSubmitPayload | LoginSuccessPayload

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

export interface LoginState {
  email: string | null;
  token: string | null;
}

export type LoginAction = 
  | LoginSubmitAction 
  | LoginSuccessAction 
  | LogoutSubmitAction
  | LoginFailureAction
  | AnyAction

