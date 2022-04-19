import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    issueAdded(state, action) {
      const newissue = {
        ...action.payload,
      };
      return [
        ...state,
        newissue,
      ];
    },
    issuesLoaded(state, action) {
      return [...action.payload];
    },
  },
});

export const { issueAdded, issuesLoaded } = issueSlice.actions;
export default issueSlice.reducer;
