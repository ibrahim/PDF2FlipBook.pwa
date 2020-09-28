import React from 'react';
import { useDoubleTap } from 'use-double-tap';

const Page = (props) => {
  const { page, index, setPageIndex, setZoom} = props
  
  const onDblTap = useDoubleTap((event) => { 
    console.log("image: ",{ index })
    setPageIndex(index + 1); 
    setZoom(true);
  })

  return(
    <div key={`flip-page-${index}`} className="page">
      <img src={ page.preview_src } alt="" {...onDblTap} style={{ transition: 'all 0.2s linear'}}/>
    </div>
  )
} 

export default Page
