import React from "react";
import { connect, DispatchProp, useSelector} from "react-redux";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Form, FormField, Text, Select, TextInput, Button, Box, Main, Heading, Paragraph } from "grommet";
import styled from "styled-components";
import Joi from '@hapi/joi';
import { FiUser,FiLock,FiEdit,FiDelete } from 'react-icons/fi'
import { 
  getPublicationsRequest, 
  processIssueRequest, 
  getIssuesRequest, 
  getIssueRequest, 
  getIssueSuccess,
  updateIssueRequest 
} from '../actions'
import { IIssue, IPublication } from '../types'
import { MonthNames } from '../../../utils/month-names'
import { AppState } from "../../../store";
import * as Selectors from '../selectors'
import { editIssueSchema } from '../schemas'
import * as Api from '../api'

import Breadcrumb from './breadcrumb'
import Pages from './pages'
import Upload from './upload'


export type ConnectedProps = {
  issue: IIssue | null;
  publication: IPublication | null;
  token: string | null;
};

export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (state: AppState, props: RouteComponentProps): ConnectedProps => ({
  issue: Selectors.getIssue(state, props),
  publication: Selectors.getPublication(state, props),
  token: state.login.token
});

const Show = (props: Props) => {
  const { dispatch, match, history, issue, publication, token } = props;
  const { id, publication_id } = (match.params as {publication_id: string, id: string} )

  const [is_fresh,setFreshIssue] = React.useState(false)
  
  const has_pdf = is_fresh && issue && Array.isArray(issue.files) && issue.files.length > 0
  const file = has_pdf && issue && issue.files[0] ? issue.files[0] : null
  const is_processed = is_fresh && file && issue && file.uuid && file.uuid ===  issue.file_uuid ? true : false
  const has_pages = is_fresh && is_processed && issue && issue.pages_count && parseInt(issue.pages_count) > 0
  const is_processing = is_fresh && has_pdf && !is_processed

  //{{{  Retrieve a fresh copy of issue with a list of uploaded pdf
  React.useEffect(() => {
    if(!is_fresh && token){
      Api.getIssue({id, publication_id}, token)
      .then( ({issue}) => { 
        setFreshIssue(true); 
        dispatch(getIssueSuccess({issue, publication_id})) 
        console.log("issue is refreshed",issue)
      })
      .catch(err => console.log({err}))
    }
  },[is_fresh, token, publication_id])
  //}}}
  //{{{ Get all publications
  React.useEffect(() => {
    if(!publication) dispatch(getPublicationsRequest({publication_id}))
  },[publication])
  //}}}
  //{{{  Process Issue
  //start issue processing if issue has an uploaded pdf but not processed yet.
  // - On Issue create files[] is empty, issue file uuid is null
  // - On Update form screen show upload pdf
  // - On Upload file and getIssue, the return issues contains a array of files
  // - if files[0].uuid === issue.file_uuid then the issue pdf is already processed
  // - issue.pages[] should have the pdf pages
  // React.useEffect(() => {
    // console.log({is_fresh, issue, is_processed, file})
    // if(is_fresh && file && issue && !is_processed){
    //     console.log("Dispatch processIssueRequest")
    //     dispatch(processIssueRequest({id, publication_id})) 
    // }
  // },[is_fresh, issue,id, publication_id, is_processed])
  //}}}

  if(!is_fresh || !issue ){ return <p>"Loading...</p>}
  return (
    <Container direction="column" fill className="edit-issue" align="center" justify="start" alignContent="start" pad="small">
      <Box gap="medium" direction="row" justify="between" alignContent="start" align="center" wrap>
        <Breadcrumb issue={issue} publication={publication} />
        <Box direction="row" gap="medium">
          { null 
            && <Box><Button plain label="Remove All Pages" color="brand" icon={ <FiDelete className="edit" /> } onClick={ () => history.push(`/app/publications/${ publication_id }/issues/${ id }/edit`) } /></Box>
          }
          <Upload issue_id={ id } publication_id={ publication_id }/>
          <Box><Button plain label="Edit" color="brand" icon={ <FiEdit className="edit" /> } onClick={ () => history.push(`/app/publications/${ publication_id }/issues/${ id }/edit`) } /></Box>
        </Box>
      </Box>
      <Box fill height="100%">
        {
          has_pages && <Pages issue={ issue }/>
        }
        {
          !has_pdf && 
            <Main pad="large" align="center">
              <Heading level="3">PDF file is not uploaded</Heading>
              <Upload issue_id={ id } publication_id={ publication_id }/>
            </Main>
        }
        {
          is_processing && 
            <Main pad="large" align="center">
              <Heading level="3">Processing...</Heading>
            <Paragraph>Extract issue pages from PDF</Paragraph>
            </Main>
        }
      </Box>
    </Container>
  );
};

export const Container = styled(Box)`
  svg.edit {
    font-size: 20px;
  }
`;
export default withRouter(connect(mapStateToProps)(Show));
