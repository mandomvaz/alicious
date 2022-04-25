import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentissue: {},
};

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    issueAdded(state, action) {
      return {
        ...state,
        childs: [...state.childs, action.payload],
      };
    },
    issuesLoaded(state, action) {
      return { currentissue: action.payload };
    },
  },
});

export const { issueAdded, issuesLoaded } = issueSlice.actions;
export default issueSlice.reducer;
