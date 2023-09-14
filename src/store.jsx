import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from './reducers';

const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});

export default store;