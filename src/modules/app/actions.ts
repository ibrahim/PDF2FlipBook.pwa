import * as constants from './constants'
import {
  GetPublicationRequestAction,
  GetPublicationSuccessAction,
  GetPublicationFailureAction,
  GetPublicationRequestPayload,
  GetPublicationSuccessPayload,
  GetPublicationFailurePayload,
  GetPublicationsRequestAction,
  GetPublicationsSuccessAction,
  GetPublicationsFailureAction,
  GetPublicationsRequestPayload,
  GetPublicationsSuccessPayload,
  GetPublicationsFailurePayload
} from './types'

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
