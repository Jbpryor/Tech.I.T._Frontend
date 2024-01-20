import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/Users/userSlice';
import issueReducer from '../components/Issues/issueSlice';
import projectReducer from '../components/Projects/projectSlice';
import reportReducer from '../components/Reports/reportSlice';
import viewModeReducer from '../components/Layout/viewModeSlice';
import demoUserReducer from '../components/Auth/Demo Login/demoUserSlice';
import settingsReducer from '../components/Users/User/Settings/settingsSlice';
import notificationsReducer from '../components/Notifications/notificationsSlice';
import authReducer from '../components/Auth/authSlice'
// import { apiSlice } from './Api/apiSlice'

const rootReducer = {
  users: userReducer,
  issues: issueReducer,
  projects: projectReducer,
  reports: reportReducer,
  viewMode: viewModeReducer,
  demoUser: demoUserReducer,
  settings: settingsReducer,
  notifications: notificationsReducer,
  auth: authReducer,
  // [apiSlice.reducerPath]: apiSlice.reducer,
}

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;