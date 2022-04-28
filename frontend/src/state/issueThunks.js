import {
  issueAdded, issuesLoaded, issueDeleted, editIssue, issueEdited,
} from './issuesSlice';
import { loadedIssues, loadingIssues } from './uiSlice';

import IssueRepo from '../lib/repo/issuerepo';

async function fetchIssues(dispatch, getState) {
  dispatch(loadingIssues());
  const issues = await IssueRepo.retrieveRootIssue();
  dispatch(issuesLoaded(issues));
  dispatch(loadedIssues());
}

function fetchIssuesGeneral(iid = '') {
  return async (dispatch, getState) => {
    debugger;
    dispatch(loadingIssues());
    let issues;
    if (iid === '') {
      issues = await IssueRepo.retrieveRootIssue();
    } else {
      issues = await IssueRepo.retrieveIssue(iid);
    }
    dispatch(issuesLoaded(issues));
    dispatch(loadedIssues());
  };
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
    await IssueRepo.deleteIssue(iid);
    dispatch(issueDeleted(iid));
  };
}

function editingIssue(issue) {
  return async (dispatch, getState) => {
    await IssueRepo.editIssue(issue);
    dispatch(issueEdited(issue));
  };
}

function prepareEditIssue(iid) {
  return async (dispatch, getState) => {
    dispatch(editIssue(iid));
  };
}

const issueThunks = {
  fetchIssues,
  addIssue,
  deleteIssue,
  prepareEditIssue,
  editingIssue,
  fetchIssuesGeneral,
};

export default issueThunks;
