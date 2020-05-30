import { all, fork } from 'redux-saga/effects'
import { loginFlow, signupFlow } from '../modules/login/saga'
import { getPublicationsFlow } from '../modules/app/saga'

export function* rootSaga() {
  yield all([
    fork(loginFlow),
    fork(signupFlow),
    fork(getPublicationsFlow)
  ])
}
