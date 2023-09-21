import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import issueReducer from './issueSlice';

const rootReducer = {
  users: userReducer,
  issues: issueReducer
}

const store = configureStore({
  reducer: rootReducer
});

export default store;