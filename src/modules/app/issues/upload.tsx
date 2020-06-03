import React from 'react';
import { useDispatch } from 'react-redux' 
import { Box } from 'grommet' 
import styled from 'styled-components'
import { uploadIssueRequest } from '../actions'

interface ComponentProps {
  issue_id: string  | null ;
  publication_id: string  | null ;
}

type Props = ComponentProps
  
const Upload = (props: Props) => {
  const { issue_id, publication_id } = props
  const dispatch = useDispatch()

  const [is_uploading, setUploading] = React.useState(false)

  const callback = (progressEvent: { loaded: number; total: number}) : void => {
    const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
    console.log({percentCompleted})
  }
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleUpload")
		event.persist();
    if(!event) {
      console.log("handle Change event is null!")
      return false;
    }

    console.log("set Upload true")
    setUploading(true)
    const file = event && event.target && event.target.files && event.target.files[0]
    if(file && issue_id && publication_id) dispatch(uploadIssueRequest({ file, publication_id, issue_id, callback }))
    console.log("Dispatch true")
	};

  if(!issue_id || !publication_id){ return null; }

  return(
    <Container>
      <input type="file" onChange={ handleUpload } accept="application/pdf"/>
    </Container>
  )
}
const Container = styled(Box)`

`
export default Upload;
