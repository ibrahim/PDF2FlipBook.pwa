import React from "react";
import { connect, DispatchProp } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, FormField, TextInput, Button, Box } from "grommet";
import styled from "styled-components";
import { loginSubmit } from "./actions";
import { AppState } from "../../store";

interface FormState {
  email: string | null;
  password: string | null;
}

export type ConnectedProps = {};

export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (s: AppState): ConnectedProps => ({});

const Login = (props: Props) => {
  const { dispatch } = props;
  const [value, setValue] = React.useState({});
  return (
    <Container>
      <Form
        value={value}
        onChange={(nextValue: any) => setValue(nextValue)}
        onReset={() => setValue({})}
        onSubmit={({ value }: any) => {
          dispatch(loginSubmit(value));
        }}
      >
        <Field>
          <FormField name="email" htmlFor="text-input-email" label="Email">
            <TextInput id="text-input-email" name="email" />
          </FormField>
        </Field>
        <Field>
          <FormField
            name="password"
            htmlFor="text-input-password"
            label="Password"
          >
            <TextInput
              id="text-input-password"
              name="password"
              type="password"
            />
          </FormField>
        </Field>
        <Box direction="row" gap="large">
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    </Container>
  );
};

export const Container = styled.div`
  max-width: 300px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;
export const Field = styled.div`
  margin: 30px 0px;
`;
export default withRouter(connect(mapStateToProps)(Login));
