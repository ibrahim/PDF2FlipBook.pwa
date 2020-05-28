import React from 'react';
import { Grommet } from 'grommet';
import { DispatchProp } from 'react-redux'
import {connect} from 'react-redux'
import { Switch, Route, RouteComponentProps } from "react-router-dom"
import Login from './modules/login'
import Home from './modules/app'
import {AppState} from './store'

import './App.css';

const appTheme = {
  global: {
    font: {
      family: 'Roboto',
      size: '16px'
    },
    colors: {
      brand: '#0198E1',
    },
  },
  button: {
    border: {
      radius: '10px',
      width: '1px',
    }
  }
};

export interface ConnectedProps { 
  token: string | null;
};

export type Props =  ConnectedProps & DispatchProp;

const mapStateToProps = (state: AppState): ConnectedProps => ({
  token: state.login.token
});


function App(props: Props) {
  const { token, dispatch } = props
  if(!token){ return(<Login />) }
  return (
    <Grommet theme={appTheme} full>
      <Switch>
        <Route path="/" exact render={ (props: RouteComponentProps) => <Home {...props}/> } />
        <Route path="/login" exact render={ (props: RouteComponentProps) => <Login {...props}/> } />
      </Switch>
    </Grommet>
  );
}

export default connect(mapStateToProps)(App);
