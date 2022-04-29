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
    loadingIssues(state, action) {
      return { ...state, loadingIssues: true };
    },
    loadedIssues(state, action) {
      return { ...state, loadingIssues: false };
    },
    openIssueForm(state, action) {
      return { ...state, showIssueForm: true, issueFormLid: action.payload };
    },
    closeIssueForm(state, action) {
      return { ...state, showIssueForm: false, issueFormLid: '' };
    },
    openEditIssueForm(state, action) {
      return { ...state, editIssueForm: true };
    },
    closeEditIssueForm(state, action) {
      return { ...state, editIssueForm: false };
    },
    openIssueProperties(state, action) {
      return { ...state, issueProperties: true, showedIssue: action.payload };
    },
    closeIssueProperties(state, action) {
      return { ...state, issueProperties: false, showedIssue: {} };
    },
    openListAddForm(state, action) {
      return { ...state, listAddForm: true };
    },
    closeListAddForm(state, action) {
      return { ...state, listAddForm: false };
    },
    openListEditForm(state, action) {
      return { ...state, listEditForm: true };
    },
    closeListEditForm(state, action) {
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
