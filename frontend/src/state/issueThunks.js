import { issueAdded, issuesLoaded, issueDeleted } from './issuesSlice';
import { loadedIssues, loadingIssues } from './uiSlice';

import IssueRepo from '../lib/repo/issuerepo';

async function fetchIssues(dispatch, getState) {
  dispatch(loadingIssues());
  const issues = await IssueRepo.retrieveRootIssue();
  dispatch(issuesLoaded(issues));
  dispatch(loadedIssues());
}

function addIssue(issue) {
  return async (dispatch, getState) => {
    const fatheriid = getState().issues.currentissue.iid;
    const newissue = {
      ...issue,
      iid: await IssueRepo.addIssue({ ...issue, fatheriid }),
    };
    dispatch(issueAdded(newissue));
  };
}

function deleteIssue(iid) {
  return async (dispatch, getState) => {
    debugger;
    await IssueRepo.deleteIssue(iid);
    dispatch(issueDeleted(iid));
  };
}

const IssueThunks = {
  fetchIssues,
  addIssue,
  deleteIssue,
};

export default IssueThunks;
