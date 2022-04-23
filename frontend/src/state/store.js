import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import issueReducer from './issuesSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    issues: issueReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(logger),
});

export default store;
