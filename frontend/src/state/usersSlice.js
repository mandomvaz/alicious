import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    uid: 1,
    name: 'user1',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
