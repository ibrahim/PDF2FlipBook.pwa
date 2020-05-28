import {Action} from 'redux'
export type GetPublicationSuccessPayload = { id : string, title : string, name: string }
export type GetPublicationPayload = { id : string }

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

export interface AppState {
  publications: Publication[],
  issues: { [id: string]: Issue[]},
}
export type ActionPayload = 
  GetPublicationPayload | 
  GetPublicationSuccessPayload


export interface LoginSucccessAction extends Action<"GET_PUBLICATION_REQUEST"> {
}
export interface LoginSubmitAction extends Action<"GET_PUBLICATION_SUCCESS"> {
}

export type AppAction = {
  type: string;
  payload?: ActionPayload;
}

