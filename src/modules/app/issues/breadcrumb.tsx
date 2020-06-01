import React from 'react'
import { Box, Text} from 'grommet'
import { Link } from 'react-router-dom'
import { IIssue, IPublication } from '../types'
import styled from 'styled-components'

interface Props {
  issue: IIssue | null;
  publication: IPublication | null;
}
const Breadcrumb = (props: Props) => {
  const { publication, issue } = props
  if(!issue || !publication) return null;
  const items = [
    <Link to={`/app/publications/${ publication.id }`}>{ publication.name }</Link>,
    "/",
    issue.date_year ,
    "/",
    issue.date_month, 
    "/",
    issue.date_day    
  ]
  return(
    <Container direction="row" pad="medium" fill gap="xsmall" alignContent="start">
      { items.map((node,idx) => <Box> <Text color={ idx==0 ? 'brand' : 'default' }> { node } </Text> </Box> )}
    </Container>
  )
}

export const Container = styled(Box)`
  a {
    font-weight: 300;
    font-family: Roboto;
    text-decoration:none;
    &:first-child {
      font-weight: 600;
    }
    &:visited {
      color:inherit;
    }
  }
`

export default Breadcrumb
