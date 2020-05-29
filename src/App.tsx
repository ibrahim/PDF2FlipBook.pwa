import React from 'react';
import { DispatchProp } from 'react-redux'
import {connect} from 'react-redux'
import { Switch, Route, RouteComponentProps } from "react-router-dom"
import Login from './modules/login/login'
import Signup  from './modules/login/signup'
import Home from './modules/app'
import {AppState} from './store'

import './App.css';


export interface ConnectedProps { 
  token: string | null;
};

export type Props =  ConnectedProps & DispatchProp;

const mapStateToProps = (state: AppState): ConnectedProps => ({
  token: state.login.token
});

function App(props: Props) {
  const { token, dispatch } = props
  return (
      <Switch>
        <Route path="/" exact render={ (props: RouteComponentProps) => <Home {...props}/> } />
        <Route path="/login" exact render={ (props: RouteComponentProps) => <Login {...props}/> } />
        <Route path="/signup" exact render={ (props: RouteComponentProps) => <Signup {...props}/> } />
      </Switch>
  );
}

export default connect(mapStateToProps)(App);
