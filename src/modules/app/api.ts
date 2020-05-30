import axios from 'axios'
import { GetPublicationsRequestPayload }  from './types'

// const API_URL = 'https://us-central1-megalaonline.cloudfunctions.net/api'
const API_URL = ''

export const getPublication = (payload: GetPublicationsRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  axios
    .get(`${API_URL}/publications`)
    .then((response) => {
      console.log("get publication: ", { result: response.data })
    })
    .catch((err) => {
      console.log(err);
    });
}
export const getPublications = (payload: GetPublicationsRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios.get(`${API_URL}/publications`).then((response) => response.data)
}

