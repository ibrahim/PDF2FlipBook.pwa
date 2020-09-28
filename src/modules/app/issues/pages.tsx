import React from 'react';
import { IIssue } from "../types";
import styled from 'styled-components'
import { Box } from 'grommet'
import Turn from './turn'

import "turn.js";
const Pages = (props: { issue: IIssue }) => {
  const {issue} = props
  const { pages_count } = issue
  const pages = pages_count && new Array(parseInt(pages_count)).fill(null).map((_,index) => ({
    preview_src: `https://storage.googleapis.com/megalaonline.appspot.com/pages/${ issue.id }/${ issue.file_uuid}/${ index + 1 }.jpg`,
    full_src: `https://storage.googleapis.com/megalaonline.appspot.com/pages/${ issue.id }/${ issue.file_uuid}/large-${ index + 1 }.jpg`
  }))
  return(
    <Container fill align="center">
      <Turn className="magazine" pages={pages}/>
    </Container>
  )
}

export const Container = styled(Box)`
  .magazine {
    border:2px solid #eee;
    box-shadow:1px 1px 40px rgba(0,0,0,0.1);
    overflow:hidden;
    margin: 0 auto!important;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .magazine .page {
    height: 100%;
  }

  .magazine .page img {
    max-width: 100%;
    height: 100%;
  }
`;

export default Pages
