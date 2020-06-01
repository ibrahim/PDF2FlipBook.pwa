import React from 'react';
import {connect, DispatchProp} from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Header, Text, Heading, Button, Menu, Box, Avatar } from 'grommet'
import { TiHome } from 'react-icons/ti'
import { logoutSubmit } from '../login/actions'
import { AuthSignOut } from '../login/helpers'
import { AppState} from '../../store'
import * as firebase from 'firebase'

export interface ConnectedProps { 
  userInfo: firebase.UserInfo | null;
};

export type Props = RouteComponentProps & ConnectedProps & DispatchProp;

const mapStateToProps = (state: AppState): ConnectedProps => ({
  userInfo: state.login.userInfo
});
const NavBar = (props: Props) => {
  const { dispatch, history, userInfo } = props
  const go_home = () => history.push('/app')
  return(
    <Header background="brand">
      <Box direction="row" align="center">
        <Button icon={<TiHome onClick={ go_home } />} hoverIndicator />
        <Text size="medium" margin="none">Magala Online</Text>
      </Box>
      <Menu label={ <UserAvatar info={ userInfo }/>} items={[{ label: 'logout', onClick: () => AuthSignOut(dispatch) }]} />
    </Header>
  )
}

const UserAvatar = ({info} : { info: firebase.UserInfo | null}) => {
  if(!info) return(<div>Menu</div>);
  const { photoURL, displayName } = info
  return(
    <Box direction="row" align="center" alignContent="center">
      {photoURL && <Avatar margin="small" size="small" src={ photoURL }/> }
      <Text size="small">{ displayName }</Text>
    </Box>
  )
}
export default withRouter(connect(mapStateToProps)(NavBar))
