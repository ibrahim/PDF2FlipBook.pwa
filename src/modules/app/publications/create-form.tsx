import React from "react";
import { connect, DispatchProp } from "react-redux";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Form, TextInput, Button, Box } from "grommet";
import styled from "styled-components";
import { FiUser,FiLock } from 'react-icons/fi'
// import {  } from "./actions";
import { AppState } from "../../../store";


interface FormState {
  email: string | null;
  password: string | null;
}

export type ConnectedProps = {};

export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (s: AppState): ConnectedProps => ({});

const CreateForm = (props: Props) => {
  const { dispatch } = props;
  const [value, setValue] = React.useState({});
  
  return (
    <Container>
      <Form
        value={value}
        onChange={(nextValue: any) => setValue(nextValue)}
        onReset={() => setValue({})}
        onSubmit={({ value }: any) => {
          console.log({ value })
        }}
      >
        <Field>
            <TextInput 
              id="text-input-name" 
              placeholder="Publication Name"
              name="name" 
            />
        </Field>
        <Field>
          <TextInput 
            id="text-input-title" 
            placeholder="Title"
            name="title" />
        </Field>
        <Box direction="column" gap="small">
          <Button type="submit" color="focus" primary label="Create" fill />
          <Link to="/app/publications">Cancel, go back.</Link>
        </Box>
      </Form>
    </Container>
  );
};

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
export default withRouter(connect(mapStateToProps)(CreateForm));
