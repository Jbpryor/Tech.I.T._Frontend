import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import issueReducer from './issueSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    issue: issueReducer,
  },
});

export default store;