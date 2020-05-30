import { Reducer } from 'redux'
import produce from 'immer'
import * as constants from './constants'
import { 
  AppReducerState, 
  AppAction,
  GetPublicationsSuccessAction
} from './types'

const initialState: AppReducerState = {
  publications: null,
  issues: {},
}

export const AppReducer: Reducer<AppReducerState,AppAction> = (state: AppReducerState = initialState, action: AppAction) => {
  switch (action.type) {
    case constants.GET_PUBLICATIONS_SUCCESS:{
      return produce(state, (draft) => {
        draft.publications = (action as GetPublicationsSuccessAction).payload.publications
      })
    }
    default: {
      return state
    }
  }
}

