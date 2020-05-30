import { select, take, call, put, fork, cancel, cancelled } from 'redux-saga/effects'
import * as constants from './constants'
import { 
  GetPublicationRequestPayload, 
  GetPublicationRequestAction,
  GetPublicationsRequestPayload, 
  GetPublicationsRequestAction 
}  from './types'
import { 
  getPublicationSuccess, 
  getPublicationFailure,
  getPublicationsSuccess, 
  getPublicationsFailure 
} from './actions'
import { AppState } from '../../store'
import * as Api from './api'

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
export function* getPublicationFlow() {
  while (true) {
    const { payload } : GetPublicationRequestAction = yield take(constants.GET_PUBLICATION_REQUEST)
    yield fork(getPublication, payload as GetPublicationRequestPayload)
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
//{{{ getPublicationFlow
export function* getPublicationsFlow() {
  while (true) {
    const { payload } : GetPublicationsRequestAction = yield take(constants.GET_PUBLICATIONS_REQUEST)
    yield fork(getPublications, payload as GetPublicationsRequestPayload)
  }
}
//}}}
