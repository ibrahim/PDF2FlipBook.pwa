import React from "react";
import { connect, DispatchProp, useSelector } from "react-redux";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { FaPlus, FaChevronRight } from 'react-icons/fa'
import { Heading, Text, Button, Box } from "grommet";
import styled from "styled-components";
import { getIssuesRequest, getPublicationRequest } from "../actions";
import { IPublication, IPublicationIssues, IIssue, IIssuesState } from "../types";
import * as Selectors from '../selectors'
import { AppState } from '../../../store'



export interface ConnectedProps {
  issues: IPublicationIssues;
  publication: IPublication | null;
};

export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (state: AppState, props: RouteComponentProps): ConnectedProps => ({
  publication: Selectors.getPublication(state, props),
  issues: Selectors.getPublicationIssues(state,props)
});

const Issues = (props: Props) => {
  const { dispatch, history, match, issues, publication } = props;
  const publication_id = (match.params as {publication_id: string} ).publication_id
  
  // const publication = useSelector(state => {
  //   const publications = (state as AppState).app.publications 
  //   if(!publications) return null;
  //   if(!publication_id) return null;
  //   return publications[publication_id];
  // })
  // const issues = useSelector(state => {
  //   const issues = (state as AppState).app.issues;
  //   if(!issues) return null;
  //   const _issues = issues[publication_id];
  //   if(typeof _issues === 'undefined') return null;
  //   return _issues;
  // })

  const has_issues = issues !== null

  React.useEffect(() => {
      if(publication_id) dispatch(getIssuesRequest({ publication_id }));
  },[])
  
  React.useEffect(() => {
    if(publication === null){
      dispatch(getPublicationRequest({ id: publication_id }))
    }
  },[publication, publication_id, dispatch])

  return (
      <Box direction="column" pad="xlarge" gap="large">
        <Box direction="row" gap="large" alignContent="between" align="center"> 
          <Heading level={ 3 }>Issues</Heading>
          <Button 
            icon={ <FaPlus style={{ fontSize: '16px'}}/> } 
            color="#d9534f" 
            primary
            label="Add" 
            fill={ false }
            onClick={ () => history.push(`/app/publications/${publication_id}/new`) } 
          />
        </Box>
        <Box gap="medium">
          { issues && has_issues && Object.keys(issues).map((k) => {
            return(<IssueCard issue={ issues[k]} publication_id={ publication_id } />)
          })}
        </Box>
      </Box>
  );
};

const IssueCard = ({issue, publication_id} : { issue: IIssue, publication_id : string }) => {
  const {id, date_day, date_month, date_year} = issue
  return(
    <Link to={`/app/publications/${publication_id}/issues/${ id }`} style={{textDecoration: 'none'}}>
      <Box 
        direction="row" 
        border={{ color: 'border', size: 'small'}} 
        pad="medium" 
        align="center" 
        alignContent="between">
        <Box direction="column" fill>
          <Text color="#444">{ date_day } / { date_month } / { date_year } </Text>
        </Box>
        <FaChevronRight/>
      </Box>
    </Link>
  )
}
export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: column;
  min-height: 100vh;
  align-items: flex-start;
  justify-content: center;
`;

export default connect(mapStateToProps)(Issues);
