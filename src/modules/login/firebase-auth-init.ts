import { store } from '../../store'
import * as firebase from 'firebase/app'
import "firebase/auth";
import { loginSuccess } from './actions'

import config from "../../config/firebase"

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log({user});
    user.getIdToken().then((idToken) => { 
      store.dispatch(loginSuccess({ token: idToken, userInfo: user.providerData[0] }))
      console.log({idToken}); 
    }).catch((error) => {
      console.log("signin current user getToken fail",{error})
    })
  }
});
