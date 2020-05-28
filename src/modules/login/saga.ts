
import { take, call, put, fork, cancel, cancelled } from 'redux-saga/effects'
import * as constants from './constants'
import { LoginSubmitPayload, LoginSubmitAction, LoginAction }  from './types'
import { loginSuccess, loginFailure } from './actions'
import * as Api from './api'

export function* authorize(userData: LoginSubmitPayload) {
  try {
    const token = yield call(Api.authenticate, userData)
    yield put(loginSuccess({token}))
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
