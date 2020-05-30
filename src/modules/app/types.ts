
import * as constants from "./constants"

export type GetPublicationFailurePayload = { errors: string[] }
export type GetPublicationSuccessPayload = { publication: Publication }
export type GetPublicationRequestPayload = { id : string }

export type GetPublicationsFailurePayload = { errors: string[] }
export type GetPublicationsSuccessPayload = { publications: Publication[] }
export type GetPublicationsRequestPayload = { }

export interface AppReducerState {
  publications: Publication[] | null;
  issues: {[k : string] : Issue }
}

export interface Publication {
  id: string;
  title: string;
  name: string;
  created_at: string;
}

export interface Issue {
  id: string;
  pages: Page[];
}

export interface Page {
  url: string;
}

export interface PublicationsState {
  publications: Publication[],
  issues: { [id: string]: Issue[]},
}
export type ActionPayload = 
  | GetPublicationRequestPayload 
  | GetPublicationFailurePayload
  | GetPublicationSuccessPayload
  | GetPublicationsRequestPayload 
  | GetPublicationsFailurePayload
  | GetPublicationsSuccessPayload

export interface GetPublicationsRequestAction {
  type: typeof constants.GET_PUBLICATIONS_REQUEST;
  payload: GetPublicationsRequestPayload;
}

export interface GetPublicationsFailureAction {
  type: typeof constants.GET_PUBLICATIONS_FAILURE;
  payload: GetPublicationsFailurePayload;
}

export interface GetPublicationsSuccessAction {
  type: typeof constants.GET_PUBLICATIONS_SUCCESS;
  payload: GetPublicationsSuccessPayload;
}

export interface GetPublicationRequestAction {
  type: typeof constants.GET_PUBLICATION_REQUEST;
  payload: GetPublicationRequestPayload;
}

export interface GetPublicationFailureAction {
  type: typeof constants.GET_PUBLICATION_FAILURE;
  payload: GetPublicationFailurePayload;
}

export interface GetPublicationSuccessAction {
  type: typeof constants.GET_PUBLICATION_SUCCESS;
  payload: GetPublicationSuccessPayload;
}

export type AppAction = 
  | GetPublicationRequestAction
  | GetPublicationSuccessAction
  | GetPublicationFailureAction
  | GetPublicationsRequestAction
  | GetPublicationsSuccessAction
  | GetPublicationsFailureAction

