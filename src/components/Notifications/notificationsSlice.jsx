import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_KEY = "notifications";
export const LOCAL_STORAGE_KEY_COUNTS = "newNotificationsCount";

const initialState = {
  notifications: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
  newNotificationsCount: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_COUNTS)) || 0,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift({ ...action.payload, isNew: true });
      state.newNotificationsCount += 1;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.notifications));
      localStorage.setItem(LOCAL_STORAGE_KEY_COUNTS, JSON.stringify(state.newNotificationsCount));
    },
    markNotificationsAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.isNew = false;
      });
      state.newNotificationsCount = 0;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.notifications));
      localStorage.setItem(LOCAL_STORAGE_KEY_COUNTS, JSON.stringify(state.newNotificationsCount));
    },
  },
});

export const selectAllNotifications = (state) => state.notifications.notifications

export const {
  addNotification,
  markNotificationsAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
