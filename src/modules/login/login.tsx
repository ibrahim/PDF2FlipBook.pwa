import React from "react";
import { connect, DispatchProp } from "react-redux";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Form, FormField, TextInput, Button, Box } from "grommet";
import styled from "styled-components";
import { FiUser,FiLock } from 'react-icons/fi'
import { FaFacebookSquare, FaGoogle} from 'react-icons/fa'
import { loginSubmit } from "./actions";
import { AppState } from "../../store";
import * as firebase from 'firebase/app'
import "firebase/auth";
import { loginSuccess } from './actions'
import config from "../../config/firebase"


firebase.initializeApp(config);

interface FormState {
  email: string | null;
  password: string | null;
}

export type ConnectedProps = {};

export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (s: AppState): ConnectedProps => ({});

const google_signin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);
} 
const facebook_signin = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);
} 

const Login = (props: Props) => {
  const { dispatch, history } = props;
  const [value, setValue] = React.useState({});
  

  React.useEffect(() => {
    console.log("UseEffect check google redirect callback")
    firebase.auth().getRedirectResult().then(function(result) {
      if (result && result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = (result as any).credential.accessToken;
        dispatch(loginSuccess({ token }))
      }
      // The signed-in user info.
      const user = result.user;
      console.log("Result Credential", { result })
    }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  },[])
  return (
    <Container>
      <Box direction="column" gap="medium">
        <Button icon={ <FaGoogle style={{ fontSize: '16px'}}/> } color="#d9534f" primary label="Continue with Google" fill onClick={ google_signin } />
        <Button icon={ <FaFacebookSquare /> } color="#337ab7" primary label="Continue with Facebook" fill onClick={ facebook_signin } />
        <LineThrough><span>or</span></LineThrough>
      </Box>
      <Form
        value={value}
        onChange={(nextValue: any) => setValue(nextValue)}
        onReset={() => setValue({})}
        onSubmit={({ value }: any) => {
          dispatch(loginSubmit(value));
        }}
      >
        <Field>
            <TextInput 
              id="text-input-email" 
              placeholder="Email Address"
              name="email" 
              icon={ <FiUser style={{fontSize: '18px' }}/>}
            />
        </Field>
        <Field>
          <TextInput 
            id="text-input-password" 
            placeholder="Password"
            icon={ <FiLock />}
            name="password" type="password" />
        </Field>
        <Box direction="column" gap="small">
          <Button type="submit" color="focus" primary label="Sign in" fill />
          <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
        </Box>
      </Form>
    </Container>
  );
};

          //<FormField name="password" htmlFor="text-input-password" label="Password" >
         // <FormField name="email" htmlFor="text-input-email" label="Email">
export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;
export const Field = styled.div`
  margin: 30px 0px;
`;
export const LineThrough = styled.div`
  margin:15px 0px 0px 0px;;
  height: 4px;
  border-bottom: 1px solid #ccc;
  display:flex;
  justify-content:center;
  align-items:center;
  span {
    color:#888;
    background-color: #fff;
    display:inline-block;
    padding:0px 10px;
  }
`;
export default withRouter(connect(mapStateToProps)(Login));
