import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentissue: {},
  editingIssue: {},
};

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    issueAdded(state, action) {
      const newstate = state;
      newstate.currentissue.childs = [...newstate.currentissue.childs, action.payload];
      return newstate;
    },
    issuesLoaded(state, action) {
      return { currentissue: action.payload };
    },
    issueDeleted(state, action) {
      const newstate = state;
      newstate.currentissue.childs = newstate.currentissue.childs
        .filter((issue) => issue.iid !== action.payload);
    },
    editIssue(state, action) {
      return {
        ...state,
        editingIssue: state.currentissue.childs.find((child) => child.iid === action.payload),
      };
    },
    issueEdited(state, action) {
      const newstate = state;
      newstate.currentissue.childs = state.currentissue.childs.map((issue) => {
        if (issue.iid === action.payload.iid) {
          return action.payload;
        }
        return issue;
      });
      newstate.editingIssue = {};
      return newstate;
    },
  },
});

export const {
  issueAdded,
  issuesLoaded,
  issueDeleted,
  editIssue,
  issueEdited,
} = issueSlice.actions;
export default issueSlice.reducer;
