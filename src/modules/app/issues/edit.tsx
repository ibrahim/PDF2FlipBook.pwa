import React from "react";
import { connect, DispatchProp, useSelector} from "react-redux";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Form, FormField, Text, Select, TextInput, Button, Box } from "grommet";
import styled from "styled-components";
import Joi from '@hapi/joi';
import { FiUser,FiLock } from 'react-icons/fi'
import Breadcrumb from './breadcrumb'
import { getPublicationsRequest, getIssuesRequest, updateIssueRequest } from '../actions'
import { IIssue, IPublication } from '../types'
import { MonthNames } from '../../../utils/month-names'
import { AppState } from "../../../store";
import * as Selectors from '../selectors'
import { editIssueSchema } from '../schemas'


export type ConnectedProps = {
  issue: IIssue | null;
  publication: IPublication | null;
};

export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (state: AppState, props: RouteComponentProps): ConnectedProps => ({
  issue: Selectors.getIssue(state, props),
  publication: Selectors.getPublication(state, props)
});



const CreateIssue = (props: Props) => {
  const { dispatch, match, issue, publication } = props;
  const { id, publication_id } = (match.params as {publication_id: string, id: string} )

  const [value, setValue] = React.useState<IIssue|null>();
  const [validationResult, setValidationResult] = React.useState<Joi.ValidationResult | null>(null);
  
  React.useEffect(() => {
    if(!publication) dispatch(getPublicationsRequest({id, publication_id}))
  },[publication])

  React.useEffect(() => {
    if(!issue) dispatch(getIssuesRequest({publication_id}))
    if(issue) setValue(issue)
  },[issue])

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
  console.log({issue})
  return (
    <Box direction="column" fill className="edit-issue" align="center" alignContent="start">
      <Breadcrumb issue={issue} publication={publication} />
      <Form
        value={ value || {} }
        onChange={(nextValue: any) => { console.log({value}); setValue(nextValue) }}
        onSubmit={({ value }: any) => {
          const { date_day, date_month, date_year} = value
          const updated_issue = { date_day, date_month, date_year}
          const validation = editIssueSchema.validate(updated_issue)
          setValidationResult(validation)
          if(has_validation_errors(validation)){
            console.log({validation})
          }else{
            console.log("dispatch update issue")
            if(id && publication_id) dispatch(updateIssueRequest({id, issue: updated_issue, publication_id, callback: () => {} }))
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
          <Button type="submit" color="focus" primary label="Save Changes" fill />
          <Link to={`/app/publications/${ publication_id}`}>Cancel</Link>
        </Box>
      </Form>
    </Box>
  );
};

export const Field = styled.div`
  margin: 30px 0px;
`;
export default withRouter(connect(mapStateToProps)(CreateIssue));
