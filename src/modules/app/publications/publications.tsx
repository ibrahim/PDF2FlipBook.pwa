import React from "react";
import { connect, DispatchProp } from "react-redux";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { FaPlus, FaChevronRight } from 'react-icons/fa'
import { Heading, Text, Form, TextInput, Button, Box } from "grommet";
import styled from "styled-components";
import { getPublicationsRequest } from "../actions";
import { IPublication, IPublications } from "../types";
import { AppState } from '../../../store'



export type ConnectedProps = {
  publications: IPublications | null
};

export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (state: AppState): ConnectedProps => ({
  publications: state.app.publications
});

const Publications = (props: Props) => {
  const { dispatch, history, publications } = props;

  const not_loaded = publications === null
  const publications_keys = publications && Object.keys(publications)
  const has_publications = Array.isArray(publications_keys) && publications_keys.length > 0
  React.useEffect(() => {
    if(not_loaded){
      dispatch(getPublicationsRequest({}))
    }
  },[not_loaded, dispatch])

  return (
      <Box direction="column" pad="xlarge" gap="large">
        <Box direction="row" gap="large" alignContent="between" align="center"> 
          <Heading level={ 3 }>Publications</Heading>
          <Button 
            icon={ <FaPlus style={{ fontSize: '16px'}}/> } 
            color="#d9534f" 
            primary
            label="Add" 
            fill={ false }
            onClick={ () => history.push("/app/publications/new") } 
          />
        </Box>
        <Box gap="medium">
          { publications && has_publications && Object.keys(publications).map((k) => {
            return(<PublicationCard publication={ publications[k] } />)
          })}
    { !has_publications && <div>No Publications</div>}
        </Box>
      </Box>
  );
};

const PublicationCard = ({publication} : { publication: IPublication }) => {
  const {id, name, title, created_at} = publication
  return(
    <Link to={`/app/publications/${id}`}>
      <Box 
        direction="row" 
        border={{ color: 'border', size: 'small'}} 
        pad="medium" 
        align="center" 
        alignContent="between">
        <Box direction="column" fill>
          <Text color="neutral-1">{ name }</Text>
          <Heading level={ 3 } margin="xsmall">{ title }</Heading>
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

export default withRouter(connect(mapStateToProps)(Publications));
