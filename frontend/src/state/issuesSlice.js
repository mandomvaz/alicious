import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentissue: {},
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
      debugger;
      const newstate = state;
      newstate.currentissue.childs = newstate.currentissue.childs
        .filter((issue) => issue.iid !== action.payload);
    },
  },
});

export const { issueAdded, issuesLoaded, issueDeleted } = issueSlice.actions;
export default issueSlice.reducer;
