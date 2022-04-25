import { issueAdded, issuesLoaded } from './issuesSlice';
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
    debugger;
    const fatheriid = getState().issues.currentissue.iid;
    const newissue = {
      ...issue,
      iid: await IssueRepo.addIssue({ ...issue, fatheriid }),
    };
    dispatch(issueAdded(newissue));
  };
}

const IssueThunks = {
  fetchIssues,
  addIssue,
};

export default IssueThunks;
