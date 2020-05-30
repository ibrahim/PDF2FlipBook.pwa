import {Dispatch} from 'redux'
import * as firebase from 'firebase/app'
import "firebase/auth";
import { toast } from 'react-toastify'
import { logoutSubmit } from './actions'

export const AuthSignOut = (dispatch: Dispatch) => {
  firebase.auth().signOut().then(() => {
    dispatch(logoutSubmit())
  }).catch(function(error) {
    toast.warn("Cannot Signout")
  });
}
