import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import issueReducer from './issuesSlice';
import userReducer from './usersSlice';

export default configureStore({
  reducer: {
    issues: issueReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(logger),
});
