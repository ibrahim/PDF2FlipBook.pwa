import axios from 'axios'
import * as firebase from 'firebase/app'
import "firebase/storage";
import { toast } from 'react-toastify'
import { uuid } from 'uuidv4'
import { 
  GetPublicationRequestPayload,
  GetPublicationsRequestPayload,
  GetIssueRequestPayload,
  ProcessIssueRequestPayload,
  NewIssueRequestPayload,
  UpdateIssueRequestPayload,
  GetIssuesRequestPayload,
  UploadIssueRequestPayload,
}  from './types'

// const API_URL = 'https://us-central1-megalaonline.cloudfunctions.net/api'
const API_URL = ''

//{{{ getPublication
export const getPublication = (payload: GetPublicationRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  axios.get(`${API_URL}/publications/${ payload.id }`).then((response) => response.data)
}
//}}}
//{{{ getPublications
export const getPublications = (payload: GetPublicationsRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios.get(`${API_URL}/publications`).then((response) => response.data)
}
//}}}
//{{{ updateIssue
export const updateIssue = (payload: UpdateIssueRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios.put(`${API_URL}/publications/${payload.publication_id}/issues/${ payload.id}`, payload.issue).then((response) => response.data)
}
//}}}
//{{{ newIssue
export const newIssue = (payload: NewIssueRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios.post(`${API_URL}/publications/${payload.publication_id}/issues`, payload.issue).then((response) => response.data)
}
//}}}
//{{{ getIssue
export const getIssue = (payload: GetIssueRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios
    .get(`${API_URL}/publications/${payload.publication_id}/issues/${payload.id}`)
    .then((response) => response.data)
}
//}}}
//{{{ processIssue
export const processIssue = (payload: ProcessIssueRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios
    .post(`${API_URL}/publications/${payload.publication_id}/issues/${payload.id}/process`)
    .then((response) => response.data)
}
//}}}
//{{{ getIssues
export const getIssues = (payload: GetIssuesRequestPayload, authToken : string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  return axios.get(`${API_URL}/publications/${payload.publication_id}/issues`).then((response) => response.data)
}
//}}}
//{{{ uploadIssue
export const uploadIssue = (payload : UploadIssueRequestPayload) => {
  const { file, issue_id, publication_id} = payload
  const filename = file.name
  const filepath = `/files/publications/${ publication_id }/issues/${ issue_id }/${ filename }`
  const storage = firebase.storage().ref(filepath);
  const file_uuid = uuid()
  const metadata = {
    contentType: 'application/pdf',
    customMetadata: {
      issue_id,
      publication_id,
      filename,
      uuid: file_uuid
    }
  }

  const toastId = `upload_toast_${payload.issue_id}`
  return new Promise((resolve, reject) => {
    toast.info('Uploading file. Please wait...', { 
      toastId,
      progress: 0,
      hideProgressBar: false,
      autoClose: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
    })
    const upload = storage.put(file, metadata);
    upload.on( "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) ;
        toast.update(toastId, { progress })
      },
      () => {
        console.log("error uploading file");
        reject()
      },
      () => {
        console.log("Upload complete")
        resolve()
      }
    );
  })
}
//}}}
//{{{ uploadExample
export const uploadExample = (payload : UploadIssueRequestPayload, authToken: string) => {
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  const form_data = new FormData();
  form_data.append('file', payload.file);
  axios.defaults.headers.common = { Authorization: `${authToken}` };
	return	axios
      .post(`/publications/${ payload.publication_id }/issues/${ payload.issue_id }/upload`, form_data, {
				headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: payload.callback
      })
}
//}}}
