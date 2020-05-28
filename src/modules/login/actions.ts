
import * as constants from './constants'
import {
  LoginSubmitAction,
  LoginSuccessAction,
  LogoutSubmitAction,
  LoginFailureAction,
  LoginSuccessPayload,
  LoginFailurePayload,
  LoginSubmitPayload
} from "./types";

export const loginSubmit = (payload: LoginSubmitPayload) : LoginSubmitAction => ({
  type: constants.LOGIN_SUBMIT,
  payload
})
export const loginFailure = (payload: LoginFailurePayload) : LoginFailureAction => ({
  type: constants.LOGIN_FAILURE,
  payload
})

export const loginSuccess = (payload: LoginSuccessPayload) : LoginSuccessAction => ({
  type: constants.LOGIN_SUCCESS,
  payload
})

export const logoutSubmit = () : LogoutSubmitAction => ({
  type: constants.LOGOUT_SUBMIT
})
