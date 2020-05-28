import { Reducer } from 'redux'
import produce from 'immer'
import {toast} from 'react-toastify'
import { LoginState, LoginAction, LoginSuccessAction, LoginFailureAction } from './types'
import * as constants from './constants'

const initialState: LoginState = {
  email: null,
  token: null
}

export const LoginReducer: Reducer<LoginState,LoginAction> = (
  state: LoginState = initialState, 
  action: LoginAction
) => {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
      return produce(state, draft => {
        draft.token = (action as LoginSuccessAction).payload.token
      })
    case constants.LOGOUT_SUBMIT: {
      return produce(state, draft => {
        draft.token = null
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

