
import * as constants from "./constants"


export type IPublications = { [k : string]: IPublication }
export type IPublicationIssues = { [k : string]: IIssue }
export type IIssuesState = { [k : string]: IPublicationIssues }
export interface AppReducerState {
  publications: IPublications | null;
  issues: IIssuesState;
}

export interface IPublication {
  id: string;
  title: string;
  name: string;
  created_at: string;
}

export interface IIssue {
  id: string;
  date_day: number;
  date_month: number;
  date_year: number;
  files: IIssueFile[]
  file_uuid?: string;
  pages?: IPage[];
}
export interface IIssueFile {
  issue_id: string;
  publication_id: string;
  filename: string;
  uuid: string;
}
export interface IIssueForm {
  date_day: number;
  date_month: number;
  date_year: number;
}
export interface IPage {
  url: string;
}


//{{{ GetPublications Actions
export type GetPublicationsRequestPayload = { }
export type GetPublicationsSuccessPayload = { publications: IPublication[] }
export type GetPublicationsFailurePayload = { errors: string[] }

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
//}}}
//{{{ Get Publication Actions
export type GetPublicationRequestPayload = { id : string }
export type GetPublicationSuccessPayload = { publication: IPublication }
export type GetPublicationFailurePayload = { errors: string[] }

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
//}}}
//{{{ Get Issue Actions
export type GetIssueRequestPayload = { id : string, publication_id: string }
export type GetIssueSuccessPayload = { issue: IIssue, publication_id: string }
export type GetIssueFailurePayload = { errors: string[] }

export interface GetIssueRequestAction {
  type: typeof constants.GET_ISSUE_REQUEST;
  payload: GetIssueRequestPayload;
}

export interface GetIssueFailureAction {
  type: typeof constants.GET_ISSUE_FAILURE;
  payload: GetIssueFailurePayload;
}

export interface GetIssueSuccessAction {
  type: typeof constants.GET_ISSUE_SUCCESS;
  payload: GetIssueSuccessPayload;
}
//}}}
//{{{ Get Issues Actions
export type GetIssuesRequestPayload = { publication_id : string }
export type GetIssuesSuccessPayload = { issues: IIssue[],  publication_id: string }
export type GetIssuesFailurePayload = { errors: string[] }

export interface GetIssuesRequestAction {
  type: typeof constants.GET_ISSUES_REQUEST;
  payload: GetIssuesRequestPayload;
}

export interface GetIssuesFailureAction {
  type: typeof constants.GET_ISSUES_FAILURE;
  payload: GetIssuesFailurePayload;
}

export interface GetIssuesSuccessAction {
  type: typeof constants.GET_ISSUES_SUCCESS;
  payload: GetIssuesSuccessPayload;
}
//}}}
//{{{ New Issue Actions
export type NewIssueRequestPayload = { issue : IIssueForm, publication_id : string, callback: () => void }
export type NewIssueSuccessPayload = { issue : IIssue, publication_id : string }
export type NewIssueFailurePayload = { errors: string[] }

export interface NewIssueRequestAction {
  type: typeof constants.NEW_ISSUE_REQUEST;
  payload: NewIssueRequestPayload;
}

export interface NewIssueFailureAction {
  type: typeof constants.NEW_ISSUE_FAILURE;
  payload: NewIssueFailurePayload;
}

export interface NewIssueSuccessAction {
  type: typeof constants.NEW_ISSUE_SUCCESS;
  payload: NewIssueSuccessPayload;
}
//}}}
//{{{ Update Issue Actions
export type UpdateIssueRequestPayload = { id: string, issue : IIssueForm, publication_id : string, callback: () => void }
export type UpdateIssueSuccessPayload = { issue : IIssue, publication_id : string }
export type UpdateIssueFailurePayload = { errors: string[] }

export interface UpdateIssueRequestAction {
  type: typeof constants.UPDATE_ISSUE_REQUEST;
  payload: UpdateIssueRequestPayload;
}

export interface UpdateIssueFailureAction {
  type: typeof constants.UPDATE_ISSUE_FAILURE;
  payload: UpdateIssueFailurePayload;
}

export interface UpdateIssueSuccessAction {
  type: typeof constants.UPDATE_ISSUE_SUCCESS;
  payload: UpdateIssueSuccessPayload;
}
//}}}
//{{{ Upload Issue Actions
export type UploadIssueRequestPayload = { 
  issue_id: string, 
  file : File, 
  publication_id : string, 
  callback: (progressEvent: { loaded: number; total: number; }) => void 
}
export type UploadIssueSuccessPayload = { issue : IIssue, publication_id : string }
export type UploadIssueFailurePayload = { errors: string[] }

export interface UploadIssueRequestAction {
  type: typeof constants.UPLOAD_ISSUE_REQUEST;
  payload: UploadIssueRequestPayload;
}

export interface UploadIssueFailureAction {
  type: typeof constants.UPLOAD_ISSUE_FAILURE;
  payload: UploadIssueFailurePayload;
}

export interface UploadIssueSuccessAction {
  type: typeof constants.UPLOAD_ISSUE_SUCCESS;
  payload: UploadIssueSuccessPayload;
}
//}}}
//{{{ Process Issue Actions
export type ProcessIssueRequestPayload = { 
  id: string, 
  publication_id : string
}
export type ProcessIssueSuccessPayload = { issue : IIssue, publication_id : string }
export type ProcessIssueFailurePayload = { errors: string[] }

export interface ProcessIssueRequestAction {
  type: typeof constants.PROCESS_ISSUE_REQUEST;
  payload: ProcessIssueRequestPayload;
}

export interface ProcessIssueFailureAction {
  type: typeof constants.PROCESS_ISSUE_FAILURE;
  payload: ProcessIssueFailurePayload;
}

export interface ProcessIssueSuccessAction {
  type: typeof constants.PROCESS_ISSUE_SUCCESS;
  payload: ProcessIssueSuccessPayload;
}
//}}}

export type AppAction = 
  | GetPublicationRequestAction
  | GetPublicationSuccessAction
  | GetPublicationFailureAction
  | GetPublicationsRequestAction
  | GetPublicationsSuccessAction
  | GetPublicationsFailureAction
  | GetIssuesRequestAction
  | GetIssuesSuccessAction
  | GetIssuesFailureAction
  | GetIssueRequestAction
  | GetIssueSuccessAction
  | GetIssueFailureAction
  | NewIssueRequestAction
  | NewIssueSuccessAction
  | NewIssueFailureAction
  | UpdateIssueRequestAction
  | UpdateIssueSuccessAction
  | UpdateIssueFailureAction
  | UploadIssueRequestAction
  | UploadIssueSuccessAction
  | UploadIssueFailureAction
  | ProcessIssueRequestAction
  | ProcessIssueSuccessAction
  | ProcessIssueFailureAction


export type ActionPayload = 
  | GetPublicationRequestPayload 
  | GetPublicationFailurePayload
  | GetPublicationSuccessPayload
  | GetPublicationsRequestPayload 
  | GetPublicationsFailurePayload
  | GetPublicationsSuccessPayload
  | GetIssueRequestPayload 
  | GetIssueFailurePayload
  | GetIssueSuccessPayload
  | GetIssuesRequestPayload 
  | GetIssuesFailurePayload
  | GetIssuesSuccessPayload
  | NewIssueRequestPayload 
  | NewIssueFailurePayload
  | NewIssueSuccessPayload
  | UpdateIssueRequestPayload 
  | UpdateIssueFailurePayload
  | UpdateIssueSuccessPayload
  | UploadIssueRequestPayload 
  | UploadIssueFailurePayload
  | UploadIssueSuccessPayload
  | ProcessIssueRequestPayload 
  | ProcessIssueFailurePayload
  | ProcessIssueSuccessPayload

