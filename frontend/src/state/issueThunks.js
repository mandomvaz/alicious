import {
  issueAdded,
  issuesLoaded,
  issueDeleted,
  editIssue,
  issueEdited,
  editList,
  listEdited,
  listAdded,
  issueMovedTo,
  listMovedForward,
} from './issuesSlice';
import { loadedIssues, loadingIssues } from './uiSlice';

import IssueRepo from '../lib/repo/issuerepo';
import { APIClientPublic } from '../lib/helpers/apiclient';

async function fetchIssues(dispatch, getState) {
  dispatch(loadingIssues());
  const issues = await IssueRepo.retrieveRootIssue();
  dispatch(issuesLoaded(issues));
  dispatch(loadedIssues());
}

function fetchIssuesGeneral(iid = '') {
  return async (dispatch, getState) => {
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

function deleteIssue({ iid, lid }) {
  return async (dispatch, getState) => {
    await IssueRepo.deleteIssue({ iid, lid });
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

function prepareEditList(lid) {
  return async (dispatch, getState) => {
    dispatch(editList(lid));
  };
}

function editingList(list) {
  return async (dispatch, getState) => {
    await IssueRepo.editList(list);
    dispatch(listEdited(list));
  };
}

function addingList(list) {
  return async (dispatch, getState) => {
    const listadded = await IssueRepo.addList(list);
    dispatch(listAdded(listadded));
  };
}

function movingIssueTo({
  iid, fromlid, tolid, targetposition,
}) {
  return async (dispatch, getState) => {
    await IssueRepo.moveIssueTo({
      iid, fromlid, tolid, targetposition,
    });
    dispatch(issueMovedTo({
      iid, fromlid, tolid, targetposition,
    }));
  };
}

function movingList(forward, lid) {
  return async (dispatch, getState) => {
    const { iid } = getState().issues.currentissue;
    await IssueRepo.moveListForward({
      iid, lid, forward,
    });
    dispatch(listMovedForward({
      forward, lid,
    }));
  };
}

const issueThunks = {
  fetchIssues,
  addIssue,
  deleteIssue,
  prepareEditIssue,
  editingIssue,
  fetchIssuesGeneral,
  prepareEditList,
  editingList,
  addingList,
  movingIssueTo,
  movingList,
};

export default issueThunks;
