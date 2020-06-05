import { all, fork } from 'redux-saga/effects'
import { loginFlow, signupFlow } from '../modules/login/saga'
import { 
  getPublicationsFlow, 
  getPublicationFlow, 
  getIssueFlow, 
  newIssueFlow,
  updateIssueFlow,
  uploadIssueFlow,
  getIssuesFlow,
  processIssueFlow
} from '../modules/app/saga'

export function* rootSaga() {
  yield all([
    fork(loginFlow),
    fork(signupFlow),
    fork(getPublicationFlow),
    fork(getPublicationsFlow),
    fork(getIssuesFlow),
    fork(getIssueFlow),
    fork(newIssueFlow),
    fork(updateIssueFlow),
    fork(uploadIssueFlow),
    fork(processIssueFlow)
  ])
}
