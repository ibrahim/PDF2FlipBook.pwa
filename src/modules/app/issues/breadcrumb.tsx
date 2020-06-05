import React from 'react'
import { Box, Text} from 'grommet'
import { Link } from 'react-router-dom'
import { IIssue, IPublication } from '../types'
import styled from 'styled-components'
import {FiChevronRight} from 'react-icons/fi'

interface Props {
  issue: IIssue | null;
  publication: IPublication | null;
}
const Breadcrumb = (props: Props) => {
  const { publication, issue } = props
  if(!issue || !publication) return null;
  const items = [
    <Link to={`/app/publications/${ publication.id }`}>{ publication.name }</Link>,
    <FiChevronRight/>,
    issue.date_year ,
    <FiChevronRight/>,
    issue.date_month, 
    <FiChevronRight/>,
    issue.date_day    
  ]
  return(
    <Container direction="row" pad="medium" basis="auto" wrap gap="xsmall" alignContent="start" align="center">
      { items.map((node,idx) => <Box> <Text color="brand"> { node } </Text> </Box> )}
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
  svg {
    margin-top:5px;
  }
`

export default Breadcrumb
