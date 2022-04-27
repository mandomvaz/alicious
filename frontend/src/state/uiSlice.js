import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingIssues: false,
  showIssueForm: false,
  editIssueForm: false,
  issueProperties: false,
  showedIssue: {},
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
      return { ...state, showIssueForm: true };
    },
    closeIssueForm(state, action) {
      return { ...state, showIssueForm: false };
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
} = uiSlice.actions;
export default uiSlice.reducer;
