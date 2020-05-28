import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
// import { AppAction } from '../modules/app/types'
// import { LoginAction } from '../modules/login/types'
import * as LoginActions from '../modules/login/actions'
import { AppReducer } from '../modules/app/reducer'
import { LoginReducer } from '../modules/login/reducer'
import { rootSaga } from './root-saga'
import localForage from 'localforage';
// import rootEpic from './epics'

// type AppActions = LoginAction | AppAction

// const AccountName = localStorage.getItem("name")
// const token = window.localStorage.getItem("token")
// const epicMiddleware = createEpicMiddleware({
//    dependencies: { token, AccountName }
// });
//const middleware = [ reduxThunk as ThunkMiddleware<AppState,AppActions>]; // , epicMiddleware ];
//
const sagaMiddleware = createSagaMiddleware()
const middleware = [ sagaMiddleware ]; // , epicMiddleware ];

const persistConfig = {
  key: 'root',
  storage: localForage,
  blacklist: ['login','app']
}
const appConfig = {
  key: 'app',
  storage: localForage,
  whitelist: ['publications','issues']
}
const loginConfig = {
  key: 'login',
  storage: localForage,
  whitelist: ['email','token']
}
const reducers = combineReducers({
  login: persistReducer(loginConfig, LoginReducer),
  app: persistReducer(appConfig, AppReducer)
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const configureStore = () => {

  
  const persistedReducer = persistReducer(persistConfig, reducers)
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(
      persistedReducer,
      {},
      composeEnhancers(
        applyMiddleware(...middleware)
      )
  )


  // epicMiddleware.run(rootEpic);

  const persistor = persistStore(store)


  // const name = localStorage.getItem("name")
  // const token = localStorage.getItem("token")
  // if(name && token) store.dispatch(LoginActions.loginSuccess({token}));

  sagaMiddleware.run(rootSaga)
  
  return { store, persistor }
}

export type AppState  = ReturnType<typeof reducers>
export default configureStore

