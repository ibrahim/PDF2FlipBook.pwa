
import * as constants from './constants'
import {
  LoginSubmitAction,
  LoginSuccessAction,
  LogoutSubmitAction,
  LoginFailureAction,
  SignupSubmitAction,
  SignupSuccessAction,
  SignupFailureAction,
  LoginSuccessPayload,
  LoginFailurePayload,
  SignupSuccessPayload,
  SignupFailurePayload,
  LoginSubmitPayload,
  SignupFormState
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

export const signupSubmit = (payload: SignupFormState) : SignupSubmitAction => ({
  type: constants.SIGNUP_SUBMIT,
  payload
})

export const signupSuccess = (payload: SignupSuccessPayload) : SignupSuccessAction => ({
  type: constants.SIGNUP_SUCCESS,
  payload
})
export const signupFailure = (payload: SignupFailurePayload) : SignupFailureAction => ({
  type: constants.SIGNUP_FAILURE,
  payload
})

export const logoutSubmit = () : LogoutSubmitAction => ({
  type: constants.LOGOUT_SUBMIT
})
