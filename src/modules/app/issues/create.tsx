import React from "react";
import { connect, DispatchProp } from "react-redux";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Form, FormField, Text, Select, TextInput, Button, Box } from "grommet";
import styled from "styled-components";
import Joi from '@hapi/joi';
import { FiUser,FiLock } from 'react-icons/fi'
import { newIssueRequest } from '../actions'
import { IIssueForm } from '../types'
import { MonthNames } from '../../../utils/month-names'
// import {  } from "./actions";
import { AppState } from "../../../store";


interface FormState {
  email: string | null;
  password: string | null;
}

export type ConnectedProps = {};

export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (s: AppState): ConnectedProps => ({});

const schema = Joi.object({
    date_day: Joi.number()
        .integer()
        .min(1)
        .max(31)
        .required(), 
    date_month: Joi.number()
        .integer()
        .min(1)
        .max(12)
        .required(), 
    date_year: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear())
        .required(), 
})

const CreateIssue = (props: Props) => {
  const { dispatch, match } = props;
  const publication_id = (match.params as {publication_id: string} ).publication_id
  const defaults = {
    date_day: new Date().getDay(),
    date_month: new Date().getMonth(),
    date_year: new Date().getFullYear()
  }
  const [value, setValue] = React.useState<IIssueForm>(defaults);
  const [validationResult, setValidationResult] = React.useState<Joi.ValidationResult | null>(null);
  const has_validation_errors = (v: Joi.ValidationResult) => {
    if(v && v.error){ return true }
    return false
  }
  const has_validation_error = (field: string) => {
    if(!validationResult){ return false}
    const error = (validationResult as Joi.ValidationResult).error
    // console.log({ validationResult })
    const err = error && error.details && error.details[0] && error.details[0]
    if(!(err && err.context && err.message)) return false;
    if(err.context.key === field) return err.message.replace("_"," ");
  }
  const callback = () => props.history.push(`/app/publications/${publication_id}`)
  return (
    <Container>
      <Form
        value={value}
        onChange={(nextValue: any) => { console.log({value}); setValue(nextValue) }}
        onSubmit={({ value }: any) => {
          const validation = schema.validate(value)
          setValidationResult(validation)
          if(has_validation_errors(validation)){
            console.log({validation})
          }else{
            dispatch(newIssueRequest({ issue: value, publication_id: publication_id, callback }))
          }
        }}
      >
        <Field>
          <FormField
            name="date_day"
            htmlFor="text-input-day"
            label="Issue Day"
            error={ has_validation_error("date_day")}
          >
            <Select 
              id="text-input-day" 
              placeholder="Day"
              options={ new Array(31).fill(null).map((_,i) => i + 1) }
              name="date_day" />
          </FormField>
        </Field>
        <Field>
          <FormField
            name="date_month"
            htmlFor="text-input-month"
            label="Issue Month"
            error={ has_validation_error("date_month")}
          >
            <Select 
              id="text-input-month" 
              placeholder="Month"
              options={ new Array(12).fill(null).map((_,i) => ( i + 1 ) ) }
              name="date_month" />
          </FormField>
        </Field>
        <Field>
          <FormField
            name="date_year"
            htmlFor="text-input-year"
            label="Issue Year"
            error={ has_validation_error("date_year")}
          >
            <TextInput 
              id="text-input-year" 
              placeholder="Year"
              type="number"
              name="date_year" />
          </FormField>
        </Field>
        <Box direction="column" gap="small" align="center">
          <Button type="submit" color="focus" primary label="Create" fill />
          <Link to={`/app/publications/${ publication_id}`}>Cancel</Link>
        </Box>
      </Form>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: column;
  flex-grow:1;
  align-self:center;
  align-items: center;
  justify-content: center;
`;
export const Field = styled.div`
  margin: 30px 0px;
`;
export default withRouter(connect(mapStateToProps)(CreateIssue));
