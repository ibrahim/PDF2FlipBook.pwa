import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import "turn.js";
import {FiX} from 'react-icons/fi'
import styled from "styled-components";
import ImageSlides from 'react-imageslides';

import Page from './page'


const Turn = (props) => {

  const { pages } = props
  const turnRef = React.useRef();
  const [is_zoom, setZoom ] = React.useState(false) 
  const [page_index, setPageIndex ] = React.useState(0) 


  React.useLayoutEffect(() => {
    const $elm = $(turnRef.current)
    //{{{ handleKeyDown
    const handleKeyDown = (event) => {
      if (event.keyCode === 37) {
        $elm && $elm.turn("previous");
      }
      if (event.keyCode === 39) {
        $elm && $elm.turn("next");
      }
    };
    //}}}
    //{{{ options
    const options = {
      width: 800,
      height: 600,
      autoCenter: true,
      display: "double",
      acceleration: true,
      elevation: 50,
      autoCenter: false,
      gradients: !$.isTouch,
      when: {
        turned: function(e, page) {
          console.log("Current view: ", $(this).turn("view"));
        },
        // missing: function (e, pages) {                      
        //   for (var i = 0; i < pages.length; i++) {
        //     $('.magazine').turn('addPage',page[pages[i]],pages[i]);
        //   }
        // }
      }
    };
    //}}}
    //{{{ if $elem init turn and listen to keydown event
    if($elm){
      $elm.turn(Object.assign({}, options));
      document.addEventListener("keydown", handleKeyDown, false);
    }
    //}}}
    //{{{ on unmount: destroy turn, remove keydown listner
    return () => {
      if ($elm) {
        $elm.turn("destroy").remove();
      }
      document.removeEventListener("keydown", handleKeyDown, false);

    }
    //}}}
  },[ turnRef ])

  const images = pages && pages.map(p => p.full_src)
  return(
    <React.Fragment>
      <CloseZoom onClick={ () => setZoom(false) } visible={ is_zoom }><FiX/></CloseZoom>
        <div
          className={props.className}
          style={Object.assign({}, props.style)}
          ref={ turnRef }
          >
            { pages && pages.map((page, index) => <Page {...{page, index, setPageIndex, setZoom}}/> ) }
        </div>
  <ImageSlides images={images} index={page_index} tapClose={ true } showPageButton={ true } isOpen={ is_zoom } />
  </React.Fragment>
  )
}

export const CloseZoom = styled.div`
  position:absolute;
  width:40px;
  height:40px;
  justify-content:center;
  align-items:center;
  background-color:rgba(0,0,0,0.2);
  display:${ p => p.visible ? 'flex' : 'none'};
  top:10px;
  right:10px;
z-index:999999;
svg {
  font-size:36px;
  color:#fff;
}
`;
export default Turn
