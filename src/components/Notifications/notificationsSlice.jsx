import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_KEY = "notifications";

const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {
  allNotifications: true,
  notificationBellIcon: true,
  newProjectNotification: true,
  newIssueNotification: true,
  newUserNotification: true,
  newReportNotification: true,
  issueClosedNotification: true,
  issueStatusChangeNotification: true,
  issueCommentNotification: true,
  issueAttachmentNotification: true,
  roleChangeNotification: true,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    toggleAllNotifications: (state) => {
      state.allNotifications = !state.allNotifications;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    toggleNotificationBellIcon: (state) => {
      state.notificationBellIcon = !state.notificationBellIcon;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    toggleNewProjectNotification: (state) => {
      state.newProjectNotification = !state.newProjectNotification;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    toggleNewIssueNotification: (state) => {
      state.newIssueNotification = !state.newIssueNotification;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    toggleNewUserNotification: (state) => {
      state.newUserNotification = !state.newUserNotification;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    toggleNewReportNotification: (state) => {
      state.newReportNotification = !state.newReportNotification;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    toggleIssueClosedNotification: (state) => {
      state.issueClosedNotification = !state.issueClosedNotification;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    toggleIssueStatusChangeNotification: (state) => {
      state.issueStatusChangeNotification = !state.issueStatusChangeNotification;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    toggleIssueCommentNotification: (state) => {
      state.issueCommentNotification = !state.issueCommentNotification;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    toggleIssueAttachmentNotification: (state) => {
      state.issueAttachmentNotification = !state.issueAttachmentNotification;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    toggleRoleChangeNotification: (state) => {
      state.roleChangeNotification = !state.roleChangeNotification;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const {
  toggleAllNotifications,
  toggleNotificationBellIcon,
  toggleNewProjectNotification,
  toggleNewIssueNotification,
  toggleNewUserNotification,
  toggleNewReportNotification,
  toggleIssueClosedNotification,
  toggleIssueStatusChangeNotification,
  toggleIssueCommentNotification,
  toggleIssueAttachmentNotification,
  toggleRoleChangeNotification,
} = notificationsSlice.actions;

export const selectNotifications = (state) => state.notifications;

export default notificationsSlice.reducer;
