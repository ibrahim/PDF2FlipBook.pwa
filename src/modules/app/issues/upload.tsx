import React from 'react';

const Upload = (props: Props) => {

  const [file, setFile] = React.useState(null)
  const [is_uploading, setUploading] = React.useState(false)

	//		image: event.target.files[0]

	profilePictureHandler = (event) => {
		event.preventDefault();
    setUploading(true)
    dispatch(uploadIssueFile({ file, issue_id, callback }))
	};

  return(
  )
}
