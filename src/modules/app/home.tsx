import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, Switch, Route } from "react-router-dom";
import { Box } from "grommet";
import styled from "styled-components";
import { AppState } from "../../store";
import Login from '../login/login'
import Publications from './publications'
import CreateForm from './publications/create-form'
import NavBar from './nav-bar'

interface FormState {
  email: string | null;
  password: string | null;
}

export interface ConnectedProps { 
  token: string | null;
};

export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (state: AppState): ConnectedProps => ({
  token: state.login.token
});

const Home = (props: Props) => {
  const { token } = props
  if(!token){ return(<Login />) }
  return (
      <Box direction="column" basis="full" fill>
        <NavBar/>
        <Box>
          <Switch>
            <Route path="/app/publications/new" exact render={ (props: RouteComponentProps) => <CreateForm {...props}/> } />
            <Route path="/app/publications" exact render={ (props: RouteComponentProps) => <Publications {...props}/> } />
            <Route path="/app" exact render={ (props: RouteComponentProps) => <Publications {...props}/> } />
          </Switch>
        </Box>
      </Box>
  );
};

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
`;
export const Field = styled.div`
  margin: 30px 0px;
`;
export default connect(mapStateToProps)(Home);
