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
    await IssueRepo.addIssue({ ...issue });
    dispatch(issueAdded(issue));
  };
}

const IssueThunks = {
  fetchIssues,
  addIssue,
};

export default IssueThunks;
