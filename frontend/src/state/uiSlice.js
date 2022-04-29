import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingIssues: false,
  showIssueForm: false,
  editIssueForm: false,
  issueProperties: false,
  listAddForm: false,
  listEditForm: false,
  showedIssue: {},
  issueFormLid: '',
  listEdit: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    loadingIssues(state) {
      return { ...state, loadingIssues: true };
    },
    loadedIssues(state) {
      return { ...state, loadingIssues: false };
    },
    openIssueForm(state, action) {
      return { ...state, showIssueForm: true, issueFormLid: action.payload };
    },
    closeIssueForm(state) {
      return { ...state, showIssueForm: false, issueFormLid: '' };
    },
    openEditIssueForm(state) {
      return { ...state, editIssueForm: true };
    },
    closeEditIssueForm(state) {
      return { ...state, editIssueForm: false };
    },
    openIssueProperties(state, action) {
      return { ...state, issueProperties: true, showedIssue: action.payload };
    },
    closeIssueProperties(state) {
      return { ...state, issueProperties: false, showedIssue: {} };
    },
    openListAddForm(state) {
      return { ...state, listAddForm: true };
    },
    closeListAddForm(state) {
      return { ...state, listAddForm: false };
    },
    openListEditForm(state) {
      return { ...state, listEditForm: true };
    },
    closeListEditForm(state) {
      return { ...state, listEditForm: false };
    },
  },
});

export const {
  loadedIssues,
  loadingIssues,
  openIssueForm,
  closeIssueForm,
  openEditIssueForm,
  closeEditIssueForm,
  openIssueProperties,
  closeIssueProperties,
  openListAddForm,
  closeListAddForm,
  openListEditForm,
  closeListEditForm,
} = uiSlice.actions;
export default uiSlice.reducer;
