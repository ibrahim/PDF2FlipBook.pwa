import { Reducer } from 'redux'
import { AppState, AppAction } from './types'

const initialState: AppState = {
  publications: [],
  issues: {},
}

export const AppReducer: Reducer<AppState,AppAction> = (state: AppState = initialState, action: AppAction) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

