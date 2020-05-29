import axios from 'axios'
import { LoginSubmitPayload, SignupFormState }  from './types'

// const API_URL = 'https://us-central1-megalaonline.cloudfunctions.net/api'
const API_URL = ''

export const storeToken = (token: string) : void => {
  const AuthToken : string =  `Bearer ${token}`
  localStorage.setItem('AuthToken', AuthToken );
}

export const clearItem = (item: string) : void => {
  localStorage.setItem(item, '' );
}

export const authenticate = (userData: LoginSubmitPayload) => {
  return axios.post(`${API_URL}/login` , userData).then(res => res.data.token );
}

export const signup = (userData: SignupFormState) => {
  return axios.post(`${API_URL}/signup` , userData).then(res => res.data.token );
}

