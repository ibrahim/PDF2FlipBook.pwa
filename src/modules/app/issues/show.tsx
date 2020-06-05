import React from "react";
import { connect, DispatchProp, useSelector} from "react-redux";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Form, FormField, Text, Select, TextInput, Button, Box } from "grommet";
import styled from "styled-components";
import Joi from '@hapi/joi';
import { FiUser,FiLock,FiEdit,FiDelete } from 'react-icons/fi'
import { 
  getPublicationsRequest, 
  processIssueRequest, 
  getIssuesRequest, 
  getIssueRequest, 
  updateIssueRequest 
} from '../actions'
import { IIssue, IPublication } from '../types'
import { MonthNames } from '../../../utils/month-names'
import { AppState } from "../../../store";
import * as Selectors from '../selectors'
import { editIssueSchema } from '../schemas'
import * as Api from '../api'

import Breadcrumb from './breadcrumb'
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

  const [getIssue,setIssue] = React.useState<IIssue|null>(null)
  
  const has_pdf = getIssue && Array.isArray(getIssue.files)

  //{{{ Retrieve a fresh copy of issue with a list of uploaded pdf
  React.useEffect(() => {
    if(!getIssue && token){
      Api.getIssue({id, publication_id}, token)
      .then( ({issue}) => setIssue(issue))
      .catch(err => console.log({err}))
    }
  },[getIssue, token])
  //}}}
  //{{{ Get all publications if publication is not already fetched
  React.useEffect(() => {
    if(!publication) dispatch(getPublicationsRequest({publication_id}))
  },[publication])
  //}}}
  //{{{ start issue processing if issue has an uploaded pdf but not processed yet.
  // - On Issue create files[] is empty, issue file uuid is null
  // - On Update form screen show upload pdf
  // - On Upload file and getIssue, the return issues contains a array of files
  // - if files[0].uuid === issue.file_uuid then the issue pdf is already processed
  // - issue.pages[] should have the pdf pages
  React.useEffect(() => {
    if(getIssue){
      const file = getIssue.files[0]
      const is_processed = file && file.uuid && file.uuid ===  getIssue.file_uuid
      if(!is_processed) { 
        console.log("Dispatch processIssueRequest")
        dispatch(processIssueRequest({id, publication_id})) 
      }
    }
  },[getIssue])
  //}}}

  if(!issue || !publication){ return <p>"Loading...</p>}
  console.log({getIssue, has_pdf})
  return (
    <Container direction="column" fill className="edit-issue" align="center" alignContent="start" pad="large">
      <Box className="bar" pad="medium" gap="medium" direction="row" justify="between" alignContent="center" align="center" fill wrap>
          <Breadcrumb issue={issue} publication={publication} />
        <Box direction="row" gap="medium">
          { has_pdf 
            ?  <Box><Button plain label="Remove All Pages" color="brand" icon={ <FiDelete className="edit" /> } onClick={ () => history.push(`/app/publications/${ publication.id }/issues/${ issue.id }/edit`) } /></Box>
            : <Upload issue_id={ id } publication_id={ publication_id }/>
          }
          <Box><Button plain label="Edit" color="brand" icon={ <FiEdit className="edit" /> } onClick={ () => history.push(`/app/publications/${ publication.id }/issues/${ issue.id }/edit`) } /></Box>
        </Box>
      </Box>
      <Box fill>
        { has_pdf && <div>Has PDF</div>}
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
