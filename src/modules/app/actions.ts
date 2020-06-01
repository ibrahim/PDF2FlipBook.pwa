import * as constants from './constants'
import {
  GetPublicationRequestAction,
  GetPublicationSuccessAction,
  GetPublicationFailureAction,
  GetPublicationsRequestAction,
  GetPublicationsSuccessAction,
  GetPublicationsFailureAction,
  GetIssuesRequestAction,
  GetIssuesSuccessAction,
  GetIssuesFailureAction,
  GetIssueRequestAction,
  GetIssueSuccessAction,
  GetIssueFailureAction,
  NewIssueRequestAction,
  NewIssueSuccessAction,
  NewIssueFailureAction,
  UpdateIssueRequestAction,
  UpdateIssueSuccessAction,
  UpdateIssueFailureAction,
  GetPublicationRequestPayload,
  GetPublicationSuccessPayload,
  GetPublicationFailurePayload,
  GetPublicationsRequestPayload,
  GetPublicationsSuccessPayload,
  GetPublicationsFailurePayload,
  GetIssuesRequestPayload,
  GetIssuesSuccessPayload,
  GetIssuesFailurePayload,
  GetIssueRequestPayload,
  GetIssueSuccessPayload,
  GetIssueFailurePayload,
  NewIssueRequestPayload,
  NewIssueSuccessPayload,
  NewIssueFailurePayload,
  UpdateIssueRequestPayload,
  UpdateIssueSuccessPayload,
  UpdateIssueFailurePayload,
} from './types'

//{{{ get Publication Actions
export const getPublicationRequest = (payload: GetPublicationRequestPayload) : GetPublicationRequestAction => ({
  type: constants.GET_PUBLICATION_REQUEST,
  payload
})
export const getPublicationSuccess = (payload: GetPublicationSuccessPayload) : GetPublicationSuccessAction => ({
  type: constants.GET_PUBLICATION_SUCCESS,
  payload
})
export const getPublicationFailure = (payload: GetPublicationFailurePayload) : GetPublicationFailureAction => ({
  type: constants.GET_PUBLICATION_FAILURE,
  payload
})
//}}}
////{{{ get Publications Actions
export const getPublicationsRequest = (payload: GetPublicationsRequestPayload) : GetPublicationsRequestAction => ({
  type: constants.GET_PUBLICATIONS_REQUEST,
  payload
})
export const getPublicationsSuccess = (payload: GetPublicationsSuccessPayload) : GetPublicationsSuccessAction => ({
  type: constants.GET_PUBLICATIONS_SUCCESS,
  payload
})
export const getPublicationsFailure = (payload: GetPublicationsFailurePayload) : GetPublicationsFailureAction => ({
  type: constants.GET_PUBLICATIONS_FAILURE,
  payload
})
//}}}
//{{{ get Issue Actions
export const getIssueRequest = (payload: GetIssueRequestPayload) : GetIssueRequestAction => ({
  type: constants.GET_ISSUE_REQUEST,
  payload
})
export const getIssueSuccess = (payload: GetIssueSuccessPayload) : GetIssueSuccessAction => ({
  type: constants.GET_ISSUE_SUCCESS,
  payload
})
export const getIssueFailure = (payload: GetIssueFailurePayload) : GetIssueFailureAction => ({
  type: constants.GET_ISSUE_FAILURE,
  payload
})
//}}}
////{{{ get Issues Actions
export const getIssuesRequest = (payload: GetIssuesRequestPayload) : GetIssuesRequestAction => ({
  type: constants.GET_ISSUES_REQUEST,
  payload
})
export const getIssuesSuccess = (payload: GetIssuesSuccessPayload) : GetIssuesSuccessAction => ({
  type: constants.GET_ISSUES_SUCCESS,
  payload
})
export const getIssuesFailure = (payload: GetIssuesFailurePayload) : GetIssuesFailureAction => ({
  type: constants.GET_ISSUES_FAILURE,
  payload
})
//}}}
//{{{ new Issue Actions
export const newIssueRequest = (payload: NewIssueRequestPayload) : NewIssueRequestAction => ({
  type: constants.NEW_ISSUE_REQUEST,
  payload
})
export const newIssueSuccess = (payload: NewIssueSuccessPayload) : NewIssueSuccessAction => ({
  type: constants.NEW_ISSUE_SUCCESS,
  payload
})
export const newIssueFailure = (payload: NewIssueFailurePayload) : NewIssueFailureAction => ({
  type: constants.NEW_ISSUE_FAILURE,
  payload
})
//}}}
//{{{ update Issue Actions
export const updateIssueRequest = (payload: UpdateIssueRequestPayload) : UpdateIssueRequestAction => ({
  type: constants.UPDATE_ISSUE_REQUEST,
  payload
})
export const updateIssueSuccess = (payload: UpdateIssueSuccessPayload) : UpdateIssueSuccessAction => ({
  type: constants.UPDATE_ISSUE_SUCCESS,
  payload
})
export const updateIssueFailure = (payload: UpdateIssueFailurePayload) : UpdateIssueFailureAction => ({
  type: constants.UPDATE_ISSUE_FAILURE,
  payload
})
//}}}
