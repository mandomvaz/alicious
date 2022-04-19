import { nanoid } from '@reduxjs/toolkit';
import { issueAdded, issuesLoaded } from './issuesSlice';
import IssueRepo from '../lib/repo/issuerepo';

async function fetchIssues(dispatch, getState) {
  const issues = await IssueRepo.retrieveIssues();
  dispatch(issuesLoaded(issues));
}

function addIssue(issue) {
  return async function addIssueThunk(dispatch, getState) {
    await IssueRepo.addIssue({ ...issue, iid: nanoid() });
    dispatch(issueAdded(issue));
  };
}

const IssueThunks = {
  fetchIssues,
  addIssue,
};

export default IssueThunks;
