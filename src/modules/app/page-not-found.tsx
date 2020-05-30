import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Heading, Main } from 'grommet'
const PageNotFound = (props: RouteComponentProps) => {
  return(
    <Main>
      <Heading level={3}>Page Not Found</Heading>
      <a onClick={ () => props.history.push("/app")}>Go Home</a>
    </Main>
  )
}
export default PageNotFound
