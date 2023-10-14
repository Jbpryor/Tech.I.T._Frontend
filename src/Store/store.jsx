import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import issueReducer from './issueSlice';
import projectReducer from './projectSlice';
import reportReducer from './reportSlice';
import viewModeReducer from './viewModeSlice';
import demoUserReducer from './demoUserSlice';

const rootReducer = {
  users: userReducer,
  issues: issueReducer,
  projects: projectReducer,
  reports: reportReducer,
  viewMode: viewModeReducer,
  demoUser: demoUserReducer,
}

const store = configureStore({
  reducer: rootReducer
});

export default store;