import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/Users/userSlice';
import issueReducer from '../components/Issues/issueSlice';
import projectReducer from '../components/Projects/projectSlice';
import reportReducer from '../components/Reports/reportSlice';
import viewModeReducer from '../components/Layout/viewModeSlice';
import demoUserReducer from '../components/Auth/Demo Login/demoUserSlice';
import settingsReducer from '../components/Users/User/Settings/settingsSlice';
import authReducer from '../components/Auth/authSlice'
import notificationReducer from '../components/Notifications/notificationsSlice'

const rootReducer = {
  users: userReducer,
  issues: issueReducer,
  projects: projectReducer,
  reports: reportReducer,
  viewMode: viewModeReducer,
  demoUser: demoUserReducer,
  settings: settingsReducer,
  auth: authReducer,
  notifications: notificationReducer,
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;