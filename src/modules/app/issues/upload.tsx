import React from 'react';
import { useDispatch } from 'react-redux' 
import { withRouter, RouteComponentProps} from 'react-router-dom'
import { Box, Button } from 'grommet' 
import { FiUpload } from 'react-icons/fi'
import styled from 'styled-components'
import { uploadIssueRequest } from '../actions'

interface ComponentProps {
  issue_id: string  | null ;
  publication_id: string  | null ;
}

type Props = ComponentProps & RouteComponentProps
  
const Upload = (props: Props) => {
  const { issue_id, publication_id, history } = props
  const dispatch = useDispatch()

  const [is_uploading, setUploading] = React.useState(false)

  const callback = () => history.push(`/app/publications/${ publication_id }/issues/${issue_id}`)

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
      <Button primary color="brand" icon={ <FiUpload className="upload"/>} label="Upload PDF" />
      <input type="file" onChange={ handleUpload } accept="application/pdf"/>
    </Container>
  )
}

const Container = styled(Box)`
  position: relative;
  .upload {
    font-size:20px;
  }
  input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    right:0;
    bottom:0;
    width:100%;
    opacity: 0;
  }
`
export default withRouter(Upload);
