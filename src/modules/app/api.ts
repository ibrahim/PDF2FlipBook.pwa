import axios from 'axios'
import * as firebase from 'firebase/app'
import "firebase/storage";
import { toast } from 'react-toastify'
import { 
  GetPublicationRequestPayload,
  GetPublicationsRequestPayload,
  GetIssueRequestPayload,
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
  const metadata = {
    customMetadata: {
      issue_id,
      publication_id,
      filename
    }
  }
  const toastId = toast('Uploading file. please wait...', { 
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
      if(toastId) toast.update(toastId, { progress })
    },
    () => {
      console.log("error uploading file");
      toast.update(toastId, { 
        render: "Error! cannot upload file.",
        hideProgressBar: true
      })
    },
    () => {
      console.log("Upload complete")
      toast.update(toastId, { 
        render: "Upload complete!",
        hideProgressBar: true
      })
    }
  );
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
