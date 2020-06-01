import { Reducer } from 'redux'
import produce from 'immer'
import {toast} from 'react-toastify'
import { LoginState, LoginAction, LoginSuccessAction, LoginFailureAction, SignupFailureAction } from './types'
import * as constants from './constants'


// 'Bearer ya29.a0AfH6SMBICmVUrqe…q_D-H7Eap'
const initialState: LoginState = {
  email: null,
  token: null,
  userInfo: null,
  token_refreshed_at: null,
  signup_errors: null
}

export const LoginReducer: Reducer<LoginState,LoginAction> = (
  state: LoginState = initialState, 
  action: LoginAction
) => {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
      return produce(state, draft => {
        const { token, userInfo } = (action as LoginSuccessAction).payload
        draft.token = `Bearer ${ token }`
        draft.token_refreshed_at = new Date().getTime()
        draft.userInfo = userInfo
      })
    case constants.LOGOUT_SUBMIT: {
      return produce(state, draft => {
        draft.token = null
      })
    }
    case constants.SIGNUP_FAILURE: {
      return produce(state, draft => {
        draft.signup_errors = (action as SignupFailureAction).payload.errors
      })
    }
    case constants.LOGIN_FAILURE: {
      const errors = (action as LoginFailureAction ).payload.errors
      console.log("Login Error: ", errors)
      toast.warn( errors, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      return state;
    }
    default:
      return state
  }
}

