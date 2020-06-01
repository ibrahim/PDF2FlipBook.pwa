import axios from 'axios'
import { 
  GetPublicationRequestPayload,
  GetPublicationsRequestPayload,
  GetIssueRequestPayload,
  NewIssueRequestPayload,
  UpdateIssueRequestPayload,
  GetIssuesRequestPayload,
}  from './types'

// const API_URL = 'https://us-central1-megalaonline.cloudfunctions.net/api'
const API_URL = ''

export const getPublication = (payload: GetPublicationRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  axios.get(`${API_URL}/publications/${ payload.id }`).then((response) => response.data)
}
export const getPublications = (payload: GetPublicationsRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios.get(`${API_URL}/publications`).then((response) => response.data)
}

export const getIssue = (payload: GetIssueRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios
    .get(`${API_URL}/publications/${payload.publication_id}/issues/${payload.id}`)
    .then((response) => response.data)
}
export const newIssue = (payload: NewIssueRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios.post(`${API_URL}/publications/${payload.publication_id}/issues`, payload.issue).then((response) => response.data)
}
export const updateIssue = (payload: UpdateIssueRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios.put(`${API_URL}/publications/${payload.publication_id}/issues/${ payload.id}`, payload.issue).then((response) => response.data)
}

export const getIssues = (payload: GetIssuesRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios.get(`${API_URL}/publications/${payload.publication_id}/issues`).then((response) => response.data)
}
