import { Reducer } from 'redux'
import produce from 'immer'
import * as constants from './constants'
import { 
  AppReducerState, 
  AppAction,
  GetPublicationsSuccessAction,
  GetIssuesSuccessAction,
  NewIssueSuccessAction,
  UpdateIssueSuccessAction,
  IPublicationIssues,
  IIssue,
  IPublication,
  IPublications,
} from './types'

const initialState: AppReducerState = {
  publications: null,
  issues: {},
}

export const AppReducer: Reducer<AppReducerState,AppAction> = (state: AppReducerState = initialState, action: AppAction) => {
  switch (action.type) {
    //{{{ GET_PUBLICATION_SUCCESS
    case constants.GET_PUBLICATIONS_SUCCESS:{
      return produce(state, (draft) => {
        const publications : IPublications = (action as GetPublicationsSuccessAction)
          .payload
          .publications
          .reduce((acc : IPublications, item : IPublication) => {
            acc[item.id] = item
            return acc;
          },{})
        draft.publications = publications
      })
    }
      //}}}
      //{{{ GET_ISSUES_SUCCESS
    case constants.GET_ISSUES_SUCCESS:{
      return produce(state, (draft) => {
        const publication_id = (action as GetIssuesSuccessAction).payload.publication_id
        const issues : IPublicationIssues = (action as GetIssuesSuccessAction)
          .payload
          .issues
          .reduce((acc : IPublicationIssues, item : IIssue) => {
            acc[item.id] = item
            return acc;
          },{})
        draft.issues[publication_id] = issues
      })
    }
      //}}}
      //{{{NEW_ISSUE_SUCCESS
    case constants.NEW_ISSUE_SUCCESS:{
      return produce(state, (draft) => {
        const publication_id = (action as NewIssueSuccessAction).payload.publication_id
        const issue : IIssue = (action as NewIssueSuccessAction).payload.issue
        const issues : IPublicationIssues = state.issues[publication_id]
        if(typeof issues !== 'undefined') {
          draft.issues[publication_id] = {[issue.id as string]: issue, ...issues}
        }
      })
    }
      //}}}
      //{{{UPDATE_ISSUE_SUCCESS
    case constants.UPDATE_ISSUE_SUCCESS:{
      const publication_id = (action as UpdateIssueSuccessAction).payload.publication_id
      const issue : IIssue = (action as UpdateIssueSuccessAction).payload.issue
      // const issues : IPublicationIssues = state.issues[publication_id]
      return produce(state, (draft) => {
        try {
        draft.issues[publication_id][issue.id] = issue
        }catch(err){
          console.log({err})
        }
      })
    }
      //}}}
    default: {
      return state
    }
  }
}

