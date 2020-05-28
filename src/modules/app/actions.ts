import * as constants from './constants';
import { GetPublicationPayload, GetPublicationSuccessPayload, AppAction } from './types';

export const getPublication = (payload: GetPublicationPayload) : AppAction => ({
  type: constants.GET_PUBLICATION,
  payload
})

export const getPublicationSuccess = (payload: GetPublicationSuccessPayload): AppAction => ({
  type: constants.GET_PUBLICATION_SUCCESS,
  payload
})


