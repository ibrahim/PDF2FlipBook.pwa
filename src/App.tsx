import React from 'react';
import { DispatchProp } from 'react-redux'
import {connect} from 'react-redux'
import { Switch, Route, RouteComponentProps } from "react-router-dom"
import Login from './modules/login/login'
import Signup  from './modules/login/signup'
import Home from './modules/app'
import {AppState} from './store'
import PageNotFound from './modules/app/page-not-found'
import './App.css';


export interface ConnectedProps { 
};

export type Props =  ConnectedProps & DispatchProp;

const mapStateToProps = (state: AppState): ConnectedProps => ({
});

function App(props: Props) {
  return (
      <Switch>
        <Route path="/login" exact render={ (props: RouteComponentProps) => <Login {...props}/> } />
        <Route path="/signup" exact render={ (props: RouteComponentProps) => <Signup {...props}/> } />
        <Route path="/app" render={ (props: RouteComponentProps) => <Home {...props}/> } />
        <Route path="*" render={ (props: RouteComponentProps) => <PageNotFound {...props}/> } />
      </Switch>
  );
}

export default connect(mapStateToProps)(App);
