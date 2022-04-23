import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoaded(state, action) {
      return action.payload;
    },
  },
});

export const { userLoaded } = userSlice.actions;
export default userSlice.reducer;
