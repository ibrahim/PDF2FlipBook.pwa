import { select, take, call, put, fork, cancel, cancelled } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as constants from './constants'
import { 
  GetPublicationRequestAction,
  GetPublicationsRequestAction,
  GetIssueRequestAction,
  NewIssueRequestAction,
  UpdateIssueRequestAction,
  UploadIssueRequestAction,
  GetIssuesRequestAction,
  GetPublicationRequestPayload, 
  GetPublicationsRequestPayload, 
  GetIssueRequestPayload, 
  NewIssueRequestPayload, 
  UpdateIssueRequestPayload, 
  UploadIssueRequestPayload, 
  GetIssuesRequestPayload, 
  IIssue,
}  from './types'
import { 
  getPublicationSuccess, 
  getPublicationFailure,
  getPublicationsSuccess, 
  getPublicationsFailure,
  getIssueSuccess,
  getIssueFailure,
  newIssueSuccess,
  newIssueFailure,
  updateIssueSuccess,
  updateIssueFailure,
  uploadIssueSuccess,
  uploadIssueFailure,
  getIssuesSuccess,
  getIssuesFailure,
} from './actions'
import { AppState } from '../../store'
import * as Api from './api'

//{{{ getPublicationFlow
export function* getPublicationFlow() {
  while (true) {
    const { payload } : GetPublicationRequestAction = yield take(constants.GET_PUBLICATION_REQUEST)
    yield fork(getPublication, payload as GetPublicationRequestPayload)
  }
}
//}}}
//{{{ getPublication
export function* getPublication(payload: GetPublicationRequestPayload) {
  try {
    const authToken : string = yield select( (state : AppState ) => state.login.token)
    const publication = yield call(Api.getPublication, payload, authToken)
    yield put(getPublicationSuccess({ publication }))
    return publication
  } catch(error) {
    if(error.response.status === 400){
      const errors = error.response.data
      yield put(getPublicationFailure({ errors }))
    }
    console.log({errors: error.response.data})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
//}}}

//{{{ getPublicationFlow
export function* getPublicationsFlow() {
  while (true) {
    const { payload } : GetPublicationsRequestAction = yield take(constants.GET_PUBLICATIONS_REQUEST)
    yield fork(getPublications, payload as GetPublicationsRequestPayload)
  }
}
//}}}
//{{{ getPublications
export function* getPublications(payload: GetPublicationsRequestPayload) {
  try {
    const authToken : string = yield select( (state : AppState ) => state.login.token)
    const publications = yield call(Api.getPublications, payload, authToken)
    yield put(getPublicationsSuccess({ publications }))
    return publications
  } catch(error) {
    if(error.response.status === 400){
      const errors = error.response.data
      yield put(getPublicationsFailure({ errors }))
    }
    console.log({errors: error.response.data})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
//}}}

//{{{ getIssueFlow
export function* getIssueFlow() {
  while (true) {
    const { payload } : GetIssueRequestAction = yield take(constants.GET_ISSUE_REQUEST)
    yield fork(getIssue, payload as GetIssueRequestPayload)
  }
}
//}}}
//{{{ getIssue
export function* getIssue(payload: GetIssueRequestPayload) {
  try {
    const authToken : string = yield select( (state : AppState ) => state.login.token)
    const issue = yield call(Api.getIssue, payload, authToken)
    const publication_id = payload.publication_id
    yield put(getIssueSuccess({ issue, publication_id }))
    return issue
  } catch(error) {
    if(error.response.status === 400){
      const errors = error.response.data
      yield put(getIssueFailure({ errors }))
    }
    console.log({errors: error.response.data})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
//}}}

//{{{ newIssueFlow
export function* newIssueFlow() {
  while (true) {
    const { payload } : NewIssueRequestAction = yield take(constants.NEW_ISSUE_REQUEST)
    yield fork(newIssue, payload as NewIssueRequestPayload)
  }
}
//}}}
//{{{ newIssue
export function* newIssue(payload: NewIssueRequestPayload) {
  try {
    const authToken : string = yield select( (state : AppState ) => state.login.token)
    const issue : IIssue = yield call(Api.newIssue, payload, authToken)
    yield put(newIssueSuccess({ issue, publication_id: payload.publication_id }))
    payload.callback()
    return issue
  } catch(error) {
    if(error.response.status === 400){
      const errors = error.response.data
      yield put(newIssueFailure({ errors }))
    }
    console.log({errors: error.response.data})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
//}}}

//{{{ updateIssueFlow
export function* updateIssueFlow() {
  while (true) {
    const { payload } : UpdateIssueRequestAction = yield take(constants.UPDATE_ISSUE_REQUEST)
    yield fork(updateIssue, payload as UpdateIssueRequestPayload)
  }
}
//}}}
//{{{ updateIssue
export function* updateIssue(payload: UpdateIssueRequestPayload) {
  try {
    const authToken : string = yield select( (state : AppState ) => state.login.token)
    const { issue, message } : { issue: IIssue, message: string} = yield call(Api.updateIssue, payload, authToken)
    toast.success(message)
    yield put(updateIssueSuccess({ issue, publication_id: payload.publication_id }))
    payload.callback()
    return issue
  } catch(error) {
    if(error.response.status === 400){
      const errors = error.response.data
      yield put(updateIssueFailure({ errors }))
    }
    console.log({errors: error.response.data})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
//}}}

//{{{ uploadIssueFlow
export function* uploadIssueFlow() {
  while (true) {
    const { payload } : UploadIssueRequestAction = yield take(constants.UPLOAD_ISSUE_REQUEST)
    yield call(Api.uploadIssue, payload)
  }
}
//}}}

//{{{ getIssuesFlow
export function* getIssuesFlow() {
  while (true) {
    const { payload } : GetIssuesRequestAction = yield take(constants.GET_ISSUES_REQUEST)
    yield fork(getIssues, payload as GetIssuesRequestPayload)
  }
}
//}}}
//{{{ getIssues
export function* getIssues(payload: GetIssuesRequestPayload) {
  try {
    const authToken : string = yield select( (state : AppState ) => state.login.token)
    const issues = yield call(Api.getIssues, payload, authToken)
    yield put(getIssuesSuccess({ issues, publication_id: payload.publication_id }))
    return issues
  } catch(error) {
    if(error.response.status === 400){
      const errors = error.response.data
      yield put(getIssuesFailure({ errors }))
    }
    console.log({errors: error.response.data})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
//}}}
