import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import issueReducer from './Slices/issueSlice';
import projectReducer from './Slices/projectSlice';
import reportReducer from './Slices/reportSlice';
import viewModeReducer from './Slices/viewModeSlice';
import demoUserReducer from './Slices/demoUserSlice';
import settingsReducer from './Slices/settingsSlice'

const rootReducer = {
  users: userReducer,
  issues: issueReducer,
  projects: projectReducer,
  reports: reportReducer,
  viewMode: viewModeReducer,
  demoUser: demoUserReducer,
  settings: settingsReducer,
}

const store = configureStore({
  reducer: rootReducer
});

export default store;