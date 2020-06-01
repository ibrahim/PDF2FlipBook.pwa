
import { take, call, put, fork, cancel, cancelled } from 'redux-saga/effects'
import * as constants from './constants'
import { LoginSubmitPayload, LoginSubmitAction, SignupFormState, SignupSubmitAction }  from './types'
import { loginSuccess, loginFailure, signupSuccess, signupFailure } from './actions'
import * as Api from './api'

//{{{ authorize
export function* authorize(userData: LoginSubmitPayload) {
  try {
    const token = yield call(Api.authenticate, userData)
    yield put(loginSuccess({token, userInfo: null }))
    yield call(Api.storeToken, token )
    return token
  } catch(error) {
    const errors = error.response.data.general
    yield put(loginFailure({ errors }))
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
//}}}
//{{{ loginFlow
export function* loginFlow() {
  while (true) {
    const { payload: userData } : LoginSubmitAction = yield take(constants.LOGIN_SUBMIT)
    // fork return a Task object
    const task = yield fork(authorize, userData as LoginSubmitPayload)
    const action = yield take([constants.LOGOUT_SUBMIT, constants.LOGIN_FAILURE])
    if (action.type === constants.LOGOUT_SUBMIT)
      yield cancel(task)
    yield call(Api.clearItem, 'token')
  }
}
//}}}

//{{{ signup
export function* signup(userData: SignupFormState) {
  try {
    const token = yield call(Api.signup, userData)
    yield put(signupSuccess({token}))
    yield call(Api.storeToken, token )
    return token
  } catch(error) {
    if(error.response.status === 400){
      const errors = error.response.data
      yield put(signupFailure({ errors }))
    }
    console.log({errors: error.response.data})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
//}}}
//{{{ signupFlow
export function* signupFlow() {
  while (true) {
    const { payload: userData } : SignupSubmitAction = yield take(constants.SIGNUP_SUBMIT)
    console.log("Signup:", {userData})
    yield fork(signup, userData as SignupFormState)
  }
}
//}}}
