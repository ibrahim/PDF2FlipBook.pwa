import React from "react";
import { connect, DispatchProp } from "react-redux";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Form, FormField, TextInput, Button, Box } from "grommet";
import styled from "styled-components";
import { signupSubmit } from "./actions";
import { AppState } from "../../store";
import { SignupFormState, SignupErrors, SignupFields } from "./types";

export type ConnectedProps = {
  errors: SignupErrors | null
};
export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (state: AppState): ConnectedProps => ({
  errors: state.login.signup_errors
});

const Signup = (props: Props) => {
  const { dispatch, errors } = props;
  const [value, setValue] = React.useState<SignupFormState|{}>({});

  const has_error = (field: SignupFields): string | undefined => errors ? errors[field] : undefined
  return (
    <Container>
      <Form
        value={value}
        onChange={(nextValue: any) => setValue(nextValue)}
        onReset={() => setValue({})}
        onSubmit={({ value }: any) => {
          dispatch(signupSubmit(value));
        }}
      >
        <Box direction="column" gap="large">
          <Box direction="row" gap="large">
            <FormField
              name=""
              htmlFor="text-input-firstName"
              label="First Name"
            >
              <TextInput id="text-input-firstName" name="firstName" />
            </FormField>
            <FormField name="" htmlFor="text-input-lastName" label="Last Name">
              <TextInput id="text-input-lastName" name="lastName" />
            </FormField>
          </Box>
          <Box direction="column" gap="large">
            <FormField
              name="username"
              htmlFor="text-input-username"
              error={ has_error("username") }
              label="Username"
            >
              <TextInput id="text-input-username" name="username" />
            </FormField>
            <FormField 
              name="email" 
              htmlFor="text-input-email" 
              label="Email"
              error={ has_error("email") }
            >
              <TextInput id="text-input-email" name="email" />
            </FormField>
            <FormField
              name="phoneNumber"
              htmlFor="text-input-phoneNumber"
              error={ has_error("phoneNumber") }
              label="Phone Number"
            >
              <TextInput id="text-input-phoneNumber" name="phoneNumber" />
            </FormField>
            <FormField
              name="country"
              htmlFor="text-input-country"
              error={ has_error("country") }
              label="Country"
            >
              <TextInput id="text-input-country" name="country" />
            </FormField>
            <FormField
              name="password"
              htmlFor="text-input-password"
              label="Password"
              error={ has_error("password") }
            >
              <TextInput
                id="text-input-password"
                name="password"
                type="password"
              />
            </FormField>
            <FormField
              name="confirmPassword"
              htmlFor="text-input-confirmPassword"
              error={ has_error("confirmPassword") }
              label="Confirm Password"
            >
              <TextInput
                id="text-input-confirmPassword"
                name="confirmPassword"
                type="password"
              />
            </FormField>
          </Box>
          <Box direction="column" gap="large">
            <Button type="submit" primary label="Sign in" fill />
            <Link to="/signup">{"Already have an account? Sign in!"}</Link>
          </Box>
        </Box>
      </Form>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: row;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;
export const Field = styled.div`
  margin: 30px 0px;
`;
export default withRouter(connect(mapStateToProps)(Signup));
