import { createSelector, createSelectorCreator, defaultMemoize  } from 'reselect'
import isEqual from 'lodash/isEqual'
import { AppState } from '../../store'
import { RouteComponentProps } from "react-router-dom";

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

export const getIssues = (state: AppState) => state.app.issues;
export const getPublications = (state: AppState) => state.app.publications;

export const getIssueIdFromParams = (_ : AppState, props : RouteComponentProps) => (props.match.params as {id: string}).id
export const getPublicationIdFromParams = (_ : AppState, props : RouteComponentProps) => (props.match.params as {publication_id: string}).publication_id

//{{{ getIssue
export const getIssue = createDeepEqualSelector(
  [getIssues, getIssueIdFromParams, getPublicationIdFromParams],
  (issues, id, publication_id) => {
    const publication_issues = issues[publication_id]
    return publication_issues[id]
  }
)
//}}}
//{{{ getPublication
export const getPublication = createDeepEqualSelector(
  [getPublications, getPublicationIdFromParams],
  (publications, publication_id) => {
    return publications ? publications[publication_id] : null
  }
)
//}}}
//{{{ getPublicationIssues
export const getPublicationIssues = createSelector(
  [getPublicationIdFromParams, getIssues],
  (publication_id, issues) => {
    return issues[publication_id]
  }
)
//}}}
