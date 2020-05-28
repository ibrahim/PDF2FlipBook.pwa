import React from 'react';
import {connect, DispatchProp} from 'react-redux'
import { Header, Heading, Button, Menu, Box } from 'grommet'
import { TiHome } from 'react-icons/ti'
import { logoutSubmit } from '../login/actions'

const NavBar = (props: DispatchProp) => {
  const { dispatch } = props
  return(
    <Header background="brand">
      <Box direction="row" align="center">
        <Button icon={<TiHome />} hoverIndicator />
        <Heading level="3" margin="none">Magala Online</Heading>
      </Box>
    <Menu label="account" items={[{ label: 'logout', onClick: () => dispatch(logoutSubmit()) }]} />
    </Header>
  )
}

export default connect()(NavBar)
