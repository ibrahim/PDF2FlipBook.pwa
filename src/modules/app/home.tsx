import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Header, Menu, Form, FormField, TextInput, Button, Box, Grid } from "grommet";
import styled from "styled-components";
import { AppState } from "../../store";
import Login from '../login/login'
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
  const { token, dispatch } = props
  if(!token){ return(<Login />) }
  return (
      <Box direction="column" basis="full" fill>
        <NavBar/>
        <Box>
            Hello App
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
